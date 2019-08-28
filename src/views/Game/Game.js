import React, { Component } from "react";
import { View, Image } from "react-native";
import { observer } from "mobx-react";
import { Gateway } from "react-gateway";
import Navbar, { NavbarLink } from "../../components/Navbar";
import {
  TEAM_RED,
  TEAM_BLUE,
  POSITION_FORWARD,
  POSITION_DEFENDER
} from "../../constants";
import { store, gameStore, tournamentStore } from "../../store";
import Logo from "../../assets/Logo";

import CongratulationsModal from "./CongratulationsModal";
import FinishGameModal from "./FinishGameModal";
import LeadersModal from "./LeadersModal";
import Player from "./Player";
import Score from "./Score";
import styles from "./Game.styles";

const initialState = {
  player1: null,
  player2: null,
  player3: null,
  player4: null,
  finishModalVisible: false,
  leadersModalVisible: false
};

const Game = observer(
  class GameComponent extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    componentDidMount() {
      store.loadUsers();
    }

    get areAllPlayersSelected() {
      return (
        this.state.player1 &&
        this.state.player2 &&
        this.state.player3 &&
        this.state.player4
      );
    }

    selectUser = ({ user, team, position }) => {
      let userSlot;
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
        slot => this.state[slot] && this.state[slot].user === user
      );

      if (prevUserSlot) {
        if (this.state[userSlot]) {
          this.setState({
            [prevUserSlot]: {
              ...this.state[prevUserSlot],
              user: this.state[userSlot].user
            }
          });
        } else {
          this.setState({
            [prevUserSlot]: null
          });
        }
      }

      this.setState({
        [userSlot]: { user, team, position }
      });
    };

    startGame = async () => {
      const { player1, player2, player3, player4 } = this.state;
      gameStore.start({
        GamePlayers: [player1, player2, player3, player4].map(player => ({
          UserId: player.user.id,
          team: player.team,
          position: player.position
        }))
      });
    };

    undoGoal = () => {
      gameStore.game.removeLastGoal();
    };

    confirmFinishGame = () => {
      this.setState({ finishModalVisible: true });
    };

    closeFinishGameModal = () => {
      this.setState({ finishModalVisible: false });
    };

    finishGame = () => {
      this.setState(initialState);
      gameStore.reset();
    };

    saveAndFinishGame = async () => {
      gameStore
        .save()
        .then(game => tournamentStore.linkGame(game.id))
        .catch(error => null);

      this.finishGame();
    };

    rematch = () => {
      gameStore.reset();
      this.closeFinishGameModal();
    };

    saveAndRematch = async () => {
      gameStore
        .save()
        .then(game => tournamentStore.linkGame(game.id))
        .catch(error => null);

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
                user={this.state.player1 && this.state.player1.user}
                onSelect={this.selectUser}
              />
              <Player
                team={TEAM_RED}
                position={POSITION_FORWARD}
                user={this.state.player2 && this.state.player2.user}
                onSelect={this.selectUser}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Player
                team={TEAM_BLUE}
                position={POSITION_FORWARD}
                user={this.state.player3 && this.state.player3.user}
                onSelect={this.selectUser}
              />
              <Player
                team={TEAM_BLUE}
                position={POSITION_DEFENDER}
                user={this.state.player4 && this.state.player4.user}
                onSelect={this.selectUser}
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
                <NavbarLink
                  onPress={this.confirmFinishGame}
                  title="RESET GAME"
                />
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
);

export default Game;
