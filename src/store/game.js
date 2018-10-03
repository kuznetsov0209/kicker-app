import { types } from "mobx-state-tree";
import { TEAM_RED, TEAM_BLUE, TEAM_PEOPLE, TEAM_ROBOTS } from "../constants";
import User from "./user";
import { observe } from "mobx";
import gameEventEmitter, {
  EVENT_GOAL,
  EVENT_OWN_GOAL,
  EVENT_UNDO_GOAL,
  EVENT_SCORE_CHANGED,
  EVENT_GAME_STARTED,
  EVENT_GAME_FINISHED
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
        user: gamePlayer.UserId.toJSON()
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
        user: gamePlayer.UserId.toJSON()
      });
    },
    removeLastGoal() {
      self.Goals.pop();

      gameEventEmitter.emit(EVENT_UNDO_GOAL);
    },
    afterCreate() {
      runGameEventListeners();

      gameEventEmitter.emit(EVENT_GAME_STARTED);

      observe(self, "score", () => {
        gameEventEmitter.emit(EVENT_SCORE_CHANGED, {
          redScore: self.redScore,
          blueScore: self.blueScore
        });
      });

      observe(self, "completed", () => {
        gameEventEmitter.emit(EVENT_GAME_FINISHED, {
          winnerTeam: self.winnerTeam
        });
      });
    }
  }));

function runGameEventListeners() {
  gameEventEmitter.addListener(function*({ waitForEvent }) {
    yield* waitForEvent(EVENT_GAME_STARTED);
    sounds.start();
  });

  gameEventEmitter.addListener(function*({ waitForEvent }) {
    const event = yield* waitForEvent(EVENT_GAME_FINISHED);
    if (event.winnerTeam === TEAM_PEOPLE) {
      sounds.finishRobotLose();
    } else {
      sounds.finishHumanLose();
    }
  });

  gameEventEmitter.addListener(function*({ waitForEvent }) {
    while (true) {
      const event = yield* waitForEvent(EVENT_GOAL);

      if (event.payload.team === TEAM_PEOPLE) {
        sounds.goalHuman();
      } else {
        sounds.goalRobot();
      }
    }
  });

  gameEventEmitter.addListener(function*({ waitForEvent }) {
    while (true) {
      const event = yield* waitForEvent(EVENT_OWN_GOAL);

      if (event.payload.team === TEAM_PEOPLE) {
        sounds.ownGoalHuman();
      } else {
        sounds.ownGoalRobot();
      }
    }
  });
}

export default Game;
