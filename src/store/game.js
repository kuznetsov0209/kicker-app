import { types } from "mobx-state-tree";
import { TEAM_RED, TEAM_BLUE } from "../constants";
import User from "./user";
import { observe } from "mobx";
import gameEventEmitter, {
  EVENT_GOAL,
  EVENT_OWN_GOAL,
  EVENT_UNDO_GOAL,
  EVENT_SCORE_CHANGED,
  EVENT_GAME_STARTED,
  EVENT_GAME_FINISHED,
  EVENT_GAME_CLOSED
} from "./gameEventEmitter";
import sounds from "../utils/sounds";

const MAX_GOALS = 10;

const GamePlayer = types.model({
  team: types.number,
  position: types.number,
  UserId: types.reference(User)
});

const Goal = types.model({
  ownGoal: types.boolean,
  UserId: types.reference(User),
  createdAt: types.string,
  updatedAt: types.string
});

const Game = types
  .model({
    id: types.maybe(types.number),
    GamePlayers: types.optional(types.array(GamePlayer), []),
    Goals: types.optional(types.array(Goal), []),
    createdAt: types.string,
    updatedAt: types.string
  })
  .volatile(() => ({
    disposeHandlers: []
  }))
  .views(self => ({
    get redUsers() {
      return self.GamePlayers.filter(
        gamePlayer => gamePlayer.team === TEAM_RED
      ).map(gamePlayer => gamePlayer.UserId);
    },
    get redUserIds() {
      return self.redUsers.map(user => user.id);
    },
    get blueUsers() {
      return self.GamePlayers.filter(
        gamePlayer => gamePlayer.team === TEAM_BLUE
      ).map(gamePlayer => gamePlayer.UserId);
    },
    get blueUserIds() {
      return self.blueUsers.map(user => user.id);
    },
    get redGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId.id) && !goal.ownGoal
      );
    },
    get redOwnGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId.id) && goal.ownGoal
      );
    },
    get blueGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId.id) && !goal.ownGoal
      );
    },
    get blueOwnGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId.id) && goal.ownGoal
      );
    },
    get redScore() {
      return self.redGoals.length + self.blueOwnGoals.length;
    },
    get blueScore() {
      return self.blueGoals.length + self.redOwnGoals.length;
    },
    get completed() {
      return self.redScore === MAX_GOALS || self.blueScore === MAX_GOALS;
    },
    get score() {
      return `${self.redScore}:${self.blueScore}`;
    },
    get winnerTeam() {
      return self.blueScore > self.redScore ? TEAM_BLUE : TEAM_RED;
    },
    get winnerPlayers() {
      return self.winnerTeam === TEAM_BLUE ? self.blueUsers : self.redUsers;
    },
    get goalsByUserId() {
      return self.GamePlayers.reduce((data, gamePlayer) => {
        data[gamePlayer.UserId.id] = self.Goals.filter(
          goal => goal.UserId.id == gamePlayer.UserId.id && !goal.ownGoal
        );
        return data;
      }, {});
    },
    getGamePlayerByUserId(UserId) {
      return self.GamePlayers.find(
        gamePlayer => gamePlayer.UserId.id === UserId
      );
    }
  }))
  .actions(self => ({
    addGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: false,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      });

      const gamePlayer = self.getGamePlayerByUserId(UserId);
      gameEventEmitter.emit(EVENT_GOAL, {
        team: gamePlayer.team,
        user: gamePlayer.UserId.toJSON(),
        completed: self.completed
      });
    },
    addOwnGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      });

      const gamePlayer = self.getGamePlayerByUserId(UserId);
      gameEventEmitter.emit(EVENT_OWN_GOAL, {
        team: gamePlayer.team,
        user: gamePlayer.UserId.toJSON(),
        completed: self.completed
      });
    },
    removeLastGoal() {
      self.Goals.pop();

      gameEventEmitter.emit(EVENT_UNDO_GOAL);
    },
    afterCreate() {
      gameEventEmitter.emit(EVENT_GAME_STARTED);

      self.disposeHandlers.push(
        observe(self, "completed", () => {
          gameEventEmitter.emit(EVENT_GAME_FINISHED, {
            winnerTeam: self.winnerTeam
          });
        })
      );
    },
    beforeDestroy() {
      self.disposeHandlers.forEach(disposeHandler => disposeHandler());
      self.disposeHandlers = [];

      if (!self.completed) {
        gameEventEmitter.emit(EVENT_GAME_CLOSED);
      }
    }
  }));

gameEventEmitter.addListener(function*({ waitForEvent }) {
  while (true) {
    yield* waitForEvent(EVENT_GAME_STARTED);
    sounds.start();
  }
});

gameEventEmitter.addListener(function*({ waitForEvent }) {
  while (true) {
    const event = yield* waitForEvent(EVENT_GAME_FINISHED);
    if (event.winnerTeam === TEAM_RED) {
      sounds.finishBlueLose();
    } else {
      sounds.finishRedLose();
    }
  }
});

gameEventEmitter.addListener(function*({ waitForEvent }) {
  while (true) {
    const event = yield* waitForEvent(EVENT_GOAL);

    if (!event.payload.completed) {
      if (event.payload.team === TEAM_RED) {
        sounds.goalRed();
      } else {
        sounds.goalBlue();
      }
    }
  }
});

gameEventEmitter.addListener(function*({ waitForEvent }) {
  while (true) {
    const event = yield* waitForEvent(EVENT_OWN_GOAL);

    if (!event.payload.completed) {
      if (event.payload.team === TEAM_RED) {
        sounds.ownGoalRed();
      } else {
        sounds.ownGoalBlue();
      }
    }
  }
});

let randomSoundsInterval;

function startRandomSoundsInterval() {
  clearInterval(randomSoundsInterval);
  randomSoundsInterval = setInterval(() => {
    sounds.random();
  }, 5 * 60 * 1000);
}

function stopRandomSoundsInterval() {
  clearInterval(randomSoundsInterval);
}

gameEventEmitter.addListener(function*({ waitForEvent }) {
  startRandomSoundsInterval();

  while (true) {
    const event = yield* waitForEvent();

    if (event.type === EVENT_GAME_STARTED) {
      stopRandomSoundsInterval();
    } else if (
      event.type === EVENT_GAME_FINISHED ||
      event.type === EVENT_GAME_CLOSED
    ) {
      startRandomSoundsInterval();
    }
  }
});

export default Game;
