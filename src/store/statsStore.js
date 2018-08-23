import { types, flow } from "mobx-state-tree";
import api from "../api";

const UserStats = types.model({
  id: types.number,
  name: types.string,
  photoUrl: types.maybe(types.string),
  wins: types.number,
  defeats: types.number,
  goals: types.number,
  games: types.number,
  rating: types.maybe(types.number)
});

const StoreStats = types
  .model({
    usersStats: types.optional(types.array(UserStats), [])
  })
  .actions(self => {
    return {
      loadStats: flow(function*() {
        const { usersStats } = yield api.get(`/api/stats`);
        self.usersStats = usersStats;
      })
    };
  });

export const statsStore = StoreStats.create({});
