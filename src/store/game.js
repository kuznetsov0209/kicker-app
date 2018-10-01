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
  EVENT_GAME_FINISHED
} from "./gameEventEmitter";

const MAX_GOALS = 10;

const GamePlayer = types.model({
  team: types.number,
  position: types.number,
  UserId: types.reference(User)
});

const Goal = types.model({
  ownGoal: types.boolean,
  date: types.string,
  UserId: types.reference(User)
});

const Game = types
  .model({
    id: types.maybe(types.number),
    date: types.string,
    GamePlayers: types.optional(types.array(GamePlayer), []),
    Goals: types.optional(types.array(Goal), [])
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
        date: new Date().toString()
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
        date: new Date().toString()
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
        gameEventEmitter.emit(EVENT_GAME_FINISHED);
      });
    }
  }));

function runGameEventListeners() {
  gameEventEmitter.addListener(function*({ waitForEvent }) {
    yield* waitForEvent(EVENT_GAME_STARTED);
    const timeStart = Date.now();

    yield* waitForEvent(EVENT_GAME_FINISHED);
    const timeFinish = Date.now();

    console.log("#1 game time: ", timeFinish - timeStart);
  });

  gameEventEmitter.addListener(function*({ waitForEvent }) {
    let lastGoalTime = null;

    while (true) {
      yield* waitForEvent(EVENT_SCORE_CHANGED);

      if (lastGoalTime !== null) {
        console.log("#2 time from last goal", Date.now() - lastGoalTime);
      }
      lastGoalTime = Date.now();
    }
  });

  gameEventEmitter.addListener(function*({ waitForEvent }) {
    let team;
    let goalsInRow = 1;

    while (true) {
      const event = yield* waitForEvent(EVENT_GOAL);

      if (team === event.payload.team) {
        goalsInRow++;
      } else {
        team = event.payload.team;
        goalsInRow = 1;
      }
      console.log("#9 team:", team, "goal in a row:", goalsInRow);
    }
  });
}

export default Game;
