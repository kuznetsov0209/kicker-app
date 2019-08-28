import { types } from "mobx-state-tree";

const User = types.model({
  id: types.identifier(types.number),
  name: types.maybe(types.string),
  photoUrl: types.maybe(types.string),
  externalId: types.maybe(types.string)
});

export default User;
