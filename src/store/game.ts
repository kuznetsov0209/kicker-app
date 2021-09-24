import { Instance, types } from "mobx-state-tree";
import { TEAM_RED, TEAM_BLUE } from "../constants";
import User from "./user";
import { observe } from "mobx";
import gameEventEmitter, {
  EVENT_GOAL,
  EVENT_OWN_GOAL,
  EVENT_UNDO_GOAL,
  EVENT_GAME_STARTED,
  EVENT_GAME_FINISHED,
  EVENT_GAME_CLOSED
} from "./gameEventEmitter";
import sounds from "../utils/sounds";

const MAX_GOALS = 10;

export const GamePlayer = types.model({
  team: types.number,
  position: types.number,
  user: User
});

const Goal = types.model({
  ownGoal: types.boolean,
  user: User,
  createdAt: types.string,
  updatedAt: types.string
});

interface GoalByUserMap {
  [userId: number]: Instance<typeof Goal>[];
}

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
      ).map(gamePlayer => gamePlayer.user);
    },
    get blueUsers() {
      return self.GamePlayers.filter(
        gamePlayer => gamePlayer.team === TEAM_BLUE
      ).map(gamePlayer => gamePlayer.user);
    }
  }))
  .views(self => ({
    get redUserIds() {
      return self.redUsers.map(user => user.id);
    },
    get blueUserIds() {
      return self.blueUsers.map(user => user.id);
    }
  }))
  .views(self => ({
    get redGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.user.id) && !goal.ownGoal
      );
    },
    get redOwnGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.user.id) && goal.ownGoal
      );
    },
    get blueGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.user.id) && !goal.ownGoal
      );
    },
    get blueOwnGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.user.id) && goal.ownGoal
      );
    }
  }))
  .views(self => ({
    get redScore() {
      return self.redGoals.length + self.blueOwnGoals.length;
    },
    get blueScore() {
      return self.blueGoals.length + self.redOwnGoals.length;
    }
  }))
  .views(self => ({
    get completed() {
      return self.redScore === MAX_GOALS || self.blueScore === MAX_GOALS;
    },
    get score() {
      return `${self.redScore}:${self.blueScore}`;
    },
    get winnerTeam() {
      return self.blueScore > self.redScore ? TEAM_BLUE : TEAM_RED;
    },
    getGamePlayerByUser(user: Instance<typeof User>) {
      return self.GamePlayers.find(
        gamePlayer => gamePlayer.user.id === user.id
      );
    }
  }))
  .views(self => ({
    get winnerPlayers() {
      return self.winnerTeam === TEAM_BLUE ? self.blueUsers : self.redUsers;
    },
    get goalsByUserId() {
      return self.GamePlayers.reduce((data: GoalByUserMap, gamePlayer) => {
        data[gamePlayer.user.id] = self.Goals.filter(
          goal => goal.user.id == gamePlayer.user.id && !goal.ownGoal
        );
        return data;
      }, {});
    }
  }))
  .actions(self => ({
    addGoal(user: Instance<typeof User>) {
      self.Goals.push({
        user,
        ownGoal: false,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      });

      const gamePlayer = self.getGamePlayerByUser(user);
      if (gamePlayer) {
        gameEventEmitter.emit(EVENT_GOAL, {
          team: gamePlayer.team,
          // @ts-ignore
          user: gamePlayer.user.toJSON(),
          completed: self.completed
        });
      }
    },
    addOwnGoal(user: Instance<typeof User>) {
      self.Goals.push({
        user,
        ownGoal: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      });

      const gamePlayer = self.getGamePlayerByUser(user);
      if (gamePlayer) {
        gameEventEmitter.emit(EVENT_OWN_GOAL, {
          team: gamePlayer.team,
          // @ts-ignore
          user: gamePlayer.user.toJSON(),
          completed: self.completed
        });
      }
    },
    removeLastGoal() {
      self.Goals.pop();

      gameEventEmitter.emit(EVENT_UNDO_GOAL);
    },
    afterCreate() {
      gameEventEmitter.emit(EVENT_GAME_STARTED);

      self.disposeHandlers.push(
        // @ts-ignore
        observe(self, "completed", () => {
          gameEventEmitter.emit(EVENT_GAME_FINISHED, {
            winnerTeam: self.winnerTeam
          });
        })
      );
    },
    beforeDestroy() {
      // todo: add types
      // @ts-ignore
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
    if (event.payload.winnerTeam === TEAM_RED) {
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
// @ts-ignore
let randomSoundsInterval;

function startRandomSoundsInterval() {
  // @ts-ignore
  clearInterval(randomSoundsInterval);
  randomSoundsInterval = setInterval(() => {
    // @ts-ignore
    sounds.random();
  }, 5 * 60 * 1000);
}

function stopRandomSoundsInterval() {
  // @ts-ignore
  clearInterval(randomSoundsInterval);
}

gameEventEmitter.addListener(function*({ waitForEvent }) {
  startRandomSoundsInterval();

  while (true) {
    // @ts-ignore
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
