import { types } from "mobx-state-tree";

const User = types.model({
  id: types.identifierNumber,
  name: types.string,
  photoUrl: types.maybeNull(types.string)
});

export default User;
