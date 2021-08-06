import {
  types,
  flow,
  getSnapshot,
  SnapshotIn,
  Instance
} from "mobx-state-tree";
import api from "../api";
import User from "./user";
import Game, { GamePlayer } from "./game";

const GameStore = types
  .model({
    game: types.maybeNull(Game)
  })
  .actions(self => {
    return {
      start(payload: { GamePlayers: SnapshotIn<typeof GamePlayer>[] }) {
        self.game = Game.create({
          ...payload,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString()
        });
      },
      reset: () => {
        self.game = null;
      },
      save: flow(function*() {
        if (self.game) {
          api.post("/api/game", getSnapshot(self.game));
        }
      })
    };
  });

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), []),
    gameStore: GameStore
  })
  .actions(self => {
    return {
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        // todo: add types
        self.users = users
          .filter((user: any) => user.email)
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
      }),
      loadGames: flow(function*() {
        const { games } = yield api.get("/api/games");
        self.games = games;
      }),
      addUserByExternalId: flow(function*(payload) {
        const { user: data } = yield api.post("/api/users/qr", payload);
        const user = User.create(data);
        self.users.push(user);
        return user;
      })
    };
  });

export const store = Store.create({
  gameStore: {}
});

export const gameStore: Instance<typeof GameStore> = store.gameStore;
