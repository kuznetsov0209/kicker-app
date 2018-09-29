import { types, flow, getSnapshot } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import Game from "./game";

const Event = types.model({
  total_score: types.maybe(types.number),
  red_score: types.maybe(types.number),
  blue_score: types.maybe(types.number),
  event_string: types.string,
  compare_operator: types.string
});

const GameStore = types
  .model({
    game: types.maybe(Game)
  })
  .actions(self => {
    return {
      start(payload) {
        self.game = {
          ...payload,
          date: new Date().toString()
        };
      },
      reset: () => {
        self.game = null;
      },
      save: flow(function*() {
        api.post("/api/game", getSnapshot(self.game));
      })
    };
  });

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), []),
    events: types.optional(types.array(Event), []),
    gameStore: GameStore
  })
  .actions(self => {
    return {
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      }),
      loadEventPresets: flow(function*() {
        // const { events } = yield api.get("/api/events");
        self.events = [
          {
            total_score: 2,
            red_score: 2,
            event_string: "Red team dominate!",
            compare_operator: "="
          },
          {
            red_score: 3,
            event_string: "Red team will win!",
            compare_operator: ">="
          }
        ];
      }),
      loadGames: flow(function*() {
        const { games } = yield api.get("/api/games");
        self.games = games;
      })
    };
  });

export const store = Store.create({
  gameStore: {}
});

export const gameStore = store.gameStore;
