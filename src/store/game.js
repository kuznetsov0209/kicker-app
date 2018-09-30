import { types } from "mobx-state-tree";
import { TEAM_RED, TEAM_BLUE } from "../constants";
import User from "./user";
import { store } from "./index";
import compare from "../utils/compare";
import Tts from "react-native-tts";

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
    }
  }))
  .actions(self => ({
    addGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: false,
        date: new Date().toString()
      });
    },
    addOwnGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: true,
        date: new Date().toString()
      });
    },
    removeLastGoal() {
      self.Goals.pop();
    },
    callEventOnGoal() {
      const events = store.events;

      const game_events = {
        red_score: self.redScore,
        blue_score: self.blueScore,
        total_score: self.redScore + self.blueScore
      };

      for (let event of events) {
        const options = event.options;
        let t = Object.keys(options).length;

        for (let eventKey in options) {
          if (
            options[eventKey] === null ||
            compare(
              game_events[eventKey],
              options[eventKey].value,
              options[eventKey].compare_operator
            )
          ) {
            t -= 1;
          }
        }

        if (t === 0) {
          Tts.speak(event.event_string, {
            iosVoiceId: "com.apple.ttsbundle.Milena-compact"
          });

          if (!event.repeat) {
            store.removeEvent(event.id);
          }

          break;
        }
      }
    }
  }));

export default Game;
