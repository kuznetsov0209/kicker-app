import { types, flow, getSnapshot } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import Game from "./game";

const EventOption = types.model({
  value: types.number, // should set type string/number
  compare_operator: types.string
});

const EventOptions = types.model({
  total_score: types.maybe(EventOption),
  red_score: types.maybe(EventOption),
  blue_score: types.maybe(EventOption)
});

const Event = types.model({
  options: types.maybe(EventOptions),
  repeat: types.boolean,
  id: types.number,
  event_string: types.string
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
            id: 1,
            options: {
              blue_score: {
                value: 4,
                compare_operator: "<"
              },
              red_score: {
                value: 8,
                compare_operator: "="
              }
            },
            repeat: false,
            event_string: "Красные почувствовали вкус победы"
          }
        ];
      }),
      loadGames: flow(function*() {
        const { games } = yield api.get("/api/games");
        self.games = games;
      }),
      removeEvent(event_id) {
        self.events = self.events.filter(({ id }) => id !== event_id);
      }
    };
  });

export const store = Store.create({
  gameStore: {}
});

export const gameStore = store.gameStore;
