import { SnapshotOrInstance } from "mobx-state-tree";
import User from "../../store/user";

export type PlayerNumberEnum = "player1" | "player2" | "player3" | "player4";

export interface GamePlayerType {
  user: SnapshotOrInstance<typeof User>;
  team: number;
  position: number;
}

export interface GameComponentProps {}
export interface GameComponentState {
  player1: GamePlayerType | null;
  player2: GamePlayerType | null;
  player3: GamePlayerType | null;
  player4: GamePlayerType | null;
  finishModalVisible: boolean;
}
