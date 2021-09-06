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
  gameSlots: GameSlot[] | null;
}

export interface Game {
  id: number;
  ball: null;
  status: null;
  createdAt: string;
  updatedAt: string;
  Users: User[];
  Goals: Goal[];
}
export interface Goal {
  id: number;
  ownGoal: boolean;
  createdAt: string;
  updatedAt: string;
  GameId: Game["id"];
  UserId: User["id"];
}
export interface GamePlayer {
  team: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  GameId: Game["id"];
  UserId: User["id"];
}
export interface User {
  id: number;
  name: string;
  photoUrl: string;
  email: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  GamePlayer?: GamePlayer;
}

export enum TeamPosition {
  Red = 0,
  Blue = 1,
}

export enum PlayerPosition {
  Forward = 0,
  Defender = 1,
}

export interface GameSlot {
  team: TeamPosition;
  position: PlayerPosition;
  user: SnapshotOrInstance<typeof User>;
}
