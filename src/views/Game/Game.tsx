import { observer } from "mobx-react";
import React, { Component } from "react";
import { Gateway } from "react-gateway";
import { View } from "react-native";
import Logo from "../../assets/Logo";
import Navbar, { NavbarLink } from "../../components/Navbar";
import {
  POSITION_DEFENDER,
  POSITION_FORWARD,
  TEAM_BLUE,
  TEAM_RED
} from "../../constants";
import { gameStore, store } from "../../store";

import CongratulationsModal from "./CongratulationsModal";
import FinishGameModal from "./FinishGameModal";
import styles from "./Game.styles";
import {
  GameComponentProps,
  GameComponentState,
  GamePlayerType,
  PlayerNumberEnum
} from "./Game.types";
import Player from "./Player";
import Score from "./Score";
import EventSource, { MessageEvent } from "react-native-sse";
import api, { API_HOST } from "../../api";
import LeadersModal from "./LeadersModal";
import sounds from "../../utils/sounds";

const initialState: GameComponentState = {
  player1: null,
  player2: null,
  player3: null,
  player4: null,
  finishModalVisible: false,
  gameSlots: null,
  leadersModalVisible: false
};

@observer
class GameComponent extends Component<GameComponentProps, GameComponentState> {
  constructor(props: GameComponentProps) {
    super(props);
    this.state = initialState;
  }

  eventSourceMessageHandler = (event: MessageEvent) => {
    if (gameStore.game) return;

    const messageEvent = event;
    const data = messageEvent.data ? JSON.parse(messageEvent.data) : null;
    if (data.type === "update-all-players") {
      this.setState({ gameSlots: data.payload.gameSlots });
      this.state.gameSlots?.forEach(gameSlot => {
        this.selectUser({
          user: gameSlot.user,
          position: gameSlot.position,
          team: gameSlot.team
        });
      });
    }
  };
  gameEventSource = new EventSource(`${API_HOST}/api/active-game/events`);

  componentDidMount() {
    this.gameEventSource.addEventListener(
      "message",
      // @ts-ignore
      this.eventSourceMessageHandler
    );
  }

  componentDidUpdate(
    _prevProps: GameComponentProps,
    prevState: GameComponentState
  ) {
    const newPlayers = new Set(
      [
        this.state?.player1?.user?.name,
        this.state?.player2?.user?.name,
        this.state?.player3?.user?.name,
        this.state?.player4?.user?.name
      ].filter(item => item)
    );

    const oldPlayers = new Set(
      [
        prevState?.player1?.user?.name,
        prevState?.player2?.user?.name,
        prevState?.player3?.user?.name,
        prevState?.player4?.user?.name
      ].filter(item => item)
    );

    if (newPlayers.size === 4 && oldPlayers.size === 4) {
      const diff = Array.from(newPlayers).filter(
        item => !Array.from(oldPlayers).includes(item)
      );

      if (diff[0]) sounds.helloPlayer(diff[0]);
    }
  }

  componentWillUnmount() {
    this.gameEventSource.removeEventListener(
      "message",
      // @ts-ignore
      this.eventSourceMessageHandler
    );
  }

  get areAllPlayersSelected(): boolean {
    return !!(
      this.state.player1 &&
      this.state.player2 &&
      this.state.player3 &&
      this.state.player4
    );
  }

  selectUser = ({ user, team, position }: GamePlayerType) => {
    let userSlot: PlayerNumberEnum;
    if (team === TEAM_RED && position === POSITION_DEFENDER) {
      userSlot = "player1";
    } else if (team === TEAM_RED && position === POSITION_FORWARD) {
      userSlot = "player2";
    } else if (team === TEAM_BLUE && position === POSITION_FORWARD) {
      userSlot = "player3";
    } else if (team === TEAM_BLUE && position === POSITION_DEFENDER) {
      userSlot = "player4";
    }

    const prevUserSlot = ["player1", "player2", "player3", "player4"].find(
      // @ts-ignore
      slot => this.state[slot] && this.state[slot].user === user
    );

    if (prevUserSlot) {
      // @ts-ignore
      if (this.state[userSlot]) {
        // @ts-ignore
        this.setState({
          [prevUserSlot]: {
            // @ts-ignore
            ...this.state[prevUserSlot],
            // @ts-ignore
            user: this.state[userSlot].user
          }
        });
      } else {
        // @ts-ignore
        this.setState({
          [prevUserSlot]: null
        });
      }
    }
    // @ts-ignore
    this.setState({
      // @ts-ignore
      [userSlot]: { user, team, position }
    });
  };

  handleGameSlotSelect = ({ user, team, position }: GamePlayerType) => {
    api.post("/api/active-game/events", {
      type: "select-player",
      payload: {
        team: team,
        position: position,
        user: user
      }
    });
  };

  startGame = async () => {
    const { player1, player2, player3, player4 } = this.state;
    gameStore.start({
      GamePlayers: [player1, player2, player3, player4].map(
        // @ts-ignore
        (player: GamePlayerType) => ({
          user: player.user,
          team: player.team,
          position: player.position
        })
      )
    });
  };

  undoGoal = () => {
    gameStore.game?.removeLastGoal();
  };

  confirmFinishGame = () => {
    this.setState({ finishModalVisible: true });
  };

  closeFinishGameModal = () => {
    this.setState({ finishModalVisible: false });
  };

  finishGame = () => {
    this.setState(initialState);
    api.post("/api/active-game/events", {
      type: "reset-players"
    });
    gameStore.reset();
  };

  saveAndFinishGame = async () => {
    await gameStore.save();
    this.finishGame();
  };

  rematch = () => {
    gameStore.reset();
    this.closeFinishGameModal();
  };

  saveAndRematch = async () => {
    await gameStore.save();
    gameStore.reset();
  };

  openLeadersModal = () => {
    this.setState({ leadersModalVisible: true });
  };

  closeLeadersModal = () => {
    this.setState({ leadersModalVisible: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Player
              team={TEAM_RED}
              position={POSITION_DEFENDER}
              user={this.state.player1?.user}
              onSelect={this.handleGameSlotSelect}
            />
            <Player
              team={TEAM_RED}
              position={POSITION_FORWARD}
              user={this.state.player2?.user}
              onSelect={this.handleGameSlotSelect}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Player
              team={TEAM_BLUE}
              position={POSITION_FORWARD}
              user={this.state.player3?.user}
              onSelect={this.handleGameSlotSelect}
            />
            <Player
              team={TEAM_BLUE}
              position={POSITION_DEFENDER}
              user={this.state.player4?.user}
              onSelect={this.handleGameSlotSelect}
            />
          </View>
        </View>

        <Score
          game={gameStore.game}
          isReadyToStart={this.areAllPlayersSelected}
          onStartRequest={this.startGame}
        />

        <Gateway into="navbar">
          {gameStore.game ? (
            <Navbar>
              <NavbarLink onPress={this.undoGoal} title="UNDO GOAL" />
              <View style={styles.navbarLogoContainer}>
                <Logo />
              </View>
              <NavbarLink onPress={this.confirmFinishGame} title="RESET GAME" />
            </Navbar>
          ) : (
            <Navbar>
              <NavbarLink title="GAME" active />
              <NavbarLink title="LEADERS" onPress={this.openLeadersModal} />
            </Navbar>
          )}
        </Gateway>

        {gameStore.game && (
          <CongratulationsModal
            visible={gameStore.game.completed}
            onRematch={this.saveAndRematch}
            onFinish={this.saveAndFinishGame}
          />
        )}

        <FinishGameModal
          visible={this.state.finishModalVisible}
          onFinish={this.finishGame}
          onRematch={this.rematch}
          onRequestClose={this.closeFinishGameModal}
        />

        <LeadersModal
          visible={this.state.leadersModalVisible}
          onRequestClose={this.closeLeadersModal}
        />
      </View>
    );
  }
}

export default GameComponent;
