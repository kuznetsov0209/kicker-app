import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Vibration
} from "react-native";
import { observer } from "mobx-react";

import api from "../api";
import {
  TEAM_RED,
  TEAM_BLUE,
  POSITION_FORWARD,
  POSITION_DEFENDER,
  DURATION_VIBRATE,
  NEW_GAME,
  LEADERS
} from "../constants";
import Button from "../components/Button";

import Score from "./svg/Score";
import LogoArea from "./svg/LogoArea";
import Logo from "./svg/Logo";
import Player from "./Player";
import CongratsModal from "./CongratsModal";
import FinishModal from "./FinishModal";
import LeadersPage from "./LeadersPage";
import { store, gameStore } from "../store";

const styles = StyleSheet.create({
  score: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -220,
    marginTop: -260,
    width: 440,
    height: 520
  },
  scoreContainer: {
    position: "absolute",
    left: 0,
    top: 5,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  scoreTextContainer: {
    position: "relative"
  },
  scoreShadow: {
    fontSize: 66,
    fontFamily: "GothamPro-Black",
    color: "rgba(0, 0, 0, 0.1)",
    width: 150,
    textAlign: "center",
    position: "absolute"
  },
  scoreShadowLeft: {
    left: 4,
    top: 8
  },
  scoreShadowRight: {
    left: -4,
    top: -8
  },
  scoreText: {
    fontSize: 66,
    fontFamily: "GothamPro-Black",
    color: "white",
    width: 150,
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12
  },
  startButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -120,
    marginTop: -32,
    zIndex: 1
  },
  spinner: {
    marginLeft: 100
  },
  logoArea: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -151,
    marginTop: -46
  },
  logo: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -105,
    marginTop: -23
  },
  link: {
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  linkText: {
    fontFamily: "GothamPro-Black",
    fontSize: 14,
    letterSpacing: 0.8,
    color: "white",
    opacity: 0.5,
    textAlign: "center"
  },
  linkActive: {
    opacity: 1
  },
  undeline: {
    height: 3,
    backgroundColor: "white",
    top: 11
  },
  navbar: {
    height: 80,
    backgroundColor: "black"
  },
  navbarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

const initialState = {
  player1: null,
  player2: null,
  player3: null,
  player4: null,
  finishModalVisible: false,
  isStartLoadingGame: false,
  currentPage: NEW_GAME
};

const NewGame = observer(
  class NewGameComponent extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    componentDidMount() {
      store.loadUsers();
    }

    get selectedUserIds() {
      return [
        this.state.player1,
        this.state.player2,
        this.state.player3,
        this.state.player4
      ]
        .filter(player => player !== null)
        .map(player => player.user.id);
    }

    get isReady() {
      return (
        this.state.player1 &&
        this.state.player2 &&
        this.state.player3 &&
        this.state.player4
      );
    }

    selectUser = (userSlot, user, team, position) => {
      this.setState({
        [userSlot]: { user, team, position }
      });
    };

    startGame = async () => {
      Vibration.vibrate(DURATION_VIBRATE_START);
      const { player1, player2, player3, player4 } = this.state;
      this.setState({ isStartLoadingGame: true });
      const game = await api.post(`/api/game`);
      await api.post(`/api/game/join`, {
        userId: player1.user.id,
        team: player1.team,
        position: player1.position,
        gameId: game.id
      });
      await api.post(`/api/game/join`, {
        userId: player2.user.id,
        team: player2.team,
        position: player2.position,
        gameId: game.id
      });
      await api.post(`/api/game/join`, {
        userId: player3.user.id,
        team: player3.team,
        position: player3.position,
        gameId: game.id
      });
      await api.post(`/api/game/join`, {
        userId: player4.user.id,
        team: player4.team,
        position: player4.position,
        gameId: game.id
      });

      await api.post(`/api/game/start`, {
        gameId: game.id
      });

      await gameStore.init(game.id);

      this.setState({ isStartLoadingGame: false });
    };

    finishGame = async () => {
      const { game } = gameStore;
      await api.post(`/api/game/finish`, {
        gameId: game.id
      });

      this.setState(initialState);
      gameStore.reset();
    };

    undoGoal = async () => {
      gameStore.removeLastGoal();
    };

    rematch = async () => {
      const { game } = gameStore;
      await api.post(`/api/game/finish`, {
        gameId: game.id
      });
      gameStore.reset();
    };

    switchTab = val => {
      this.setState({ currentPage: val });
    };

    render() {
      const { game } = gameStore;

      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, backgroundColor: "#0e0e0e" }} />
              <View style={{ flex: 1, backgroundColor: "#191919" }} />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, backgroundColor: "#191919" }} />
              <View style={{ flex: 1, backgroundColor: "#0e0e0e" }} />
            </View>
          </View>
          <View style={styles.score}>
            <Score />
            {game && (
              <View style={styles.scoreContainer}>
                <View style={styles.scoreTextContainer}>
                  <Text style={[styles.scoreShadow, styles.scoreShadowLeft]}>
                    {game.redScore}
                  </Text>
                  <Text style={styles.scoreText}>{game.redScore}</Text>
                </View>

                <View style={styles.scoreTextContainer}>
                  <Text style={[styles.scoreShadow, styles.scoreShadowRight]}>
                    {game.blueScore}
                  </Text>
                  <Text style={styles.scoreText}>{game.blueScore}</Text>
                </View>
              </View>
            )}
          </View>

          {this.isReady &&
            !game && (
              <View style={styles.startButton}>
                {this.state.isStartLoadingGame ? (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={styles.spinner}
                  />
                ) : (
                  <Button
                    primary
                    color="white"
                    width={240}
                    onPress={this.startGame}
                  >
                    START
                  </Button>
                )}
              </View>
            )}
          {!this.isReady &&
            !game &&
            this.state.currentPage !== LEADERS && (
              <LogoArea style={styles.logoArea} />
            )}
          {!this.isReady &&
            !game &&
            this.state.currentPage !== LEADERS && <Logo style={styles.logo} />}
          {this.state.currentPage === LEADERS && (
            <LeadersPage style={{ flex: 1 }} />
          )}
          {this.state.currentPage === NEW_GAME && (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Player
                  team={TEAM_RED}
                  position={POSITION_DEFENDER}
                  user={this.state.player1 && this.state.player1.user}
                  onSelect={player =>
                    this.selectUser(
                      "player1",
                      player,
                      TEAM_RED,
                      POSITION_DEFENDER
                    )
                  }
                  selectedUserIds={this.selectedUserIds}
                  left
                  top
                  ready={!!game}
                  goals={
                    this.state.player1 &&
                    game &&
                    game.Goals.filter(
                      goal =>
                        goal.UserId === this.state.player1.user.id &&
                        !goal.ownGoal
                    ).length
                  }
                />
                <Player
                  team={TEAM_RED}
                  position={POSITION_FORWARD}
                  user={this.state.player2 && this.state.player2.user}
                  onSelect={player =>
                    this.selectUser(
                      "player2",
                      player,
                      TEAM_RED,
                      POSITION_FORWARD
                    )
                  }
                  selectedUserIds={this.selectedUserIds}
                  left
                  bottom
                  ready={!!game}
                  goals={
                    this.state.player2 &&
                    game &&
                    game.Goals.filter(
                      goal =>
                        goal.UserId === this.state.player2.user.id &&
                        !goal.ownGoal
                    ).length
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Player
                  team={TEAM_BLUE}
                  position={POSITION_FORWARD}
                  user={this.state.player3 && this.state.player3.user}
                  onSelect={player =>
                    this.selectUser(
                      "player3",
                      player,
                      TEAM_BLUE,
                      POSITION_FORWARD
                    )
                  }
                  selectedUserIds={this.selectedUserIds}
                  right
                  top
                  ready={!!game}
                  goals={
                    this.state.player3 &&
                    game &&
                    game.Goals.filter(
                      goal =>
                        goal.UserId === this.state.player3.user.id &&
                        !goal.ownGoal
                    ).length
                  }
                />
                <Player
                  team={TEAM_BLUE}
                  position={POSITION_DEFENDER}
                  user={this.state.player4 && this.state.player4.user}
                  onSelect={player =>
                    this.selectUser(
                      "player4",
                      player,
                      TEAM_BLUE,
                      POSITION_DEFENDER
                    )
                  }
                  selectedUserIds={this.selectedUserIds}
                  right
                  bottom
                  ready={!!game}
                  goals={
                    this.state.player4 &&
                    game &&
                    game.Goals.filter(
                      goal =>
                        goal.UserId === this.state.player4.user.id &&
                        !goal.ownGoal
                    ).length
                  }
                />
              </View>
            </View>
          )}

          <View style={styles.navbar}>
            {!this.isReady && (
              <View style={styles.navbarContainer}>
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => this.switchTab(NEW_GAME)}
                >
                  <View>
                    <Text
                      style={[
                        styles.linkText,
                        this.state.currentPage === NEW_GAME
                          ? styles.linkActive
                          : ""
                      ]}
                    >
                      GAME
                    </Text>
                    <View style={styles.undeline} />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.link} disabled>
                  <View>
                    <Text style={[styles.linkText]}>STATS</Text>
                    {/* <View style={styles.undeline} /> */}
                {/* </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => this.switchTab(LEADERS)}
                >
                  <View>
                    <Text
                      style={[
                        styles.linkText,
                        this.state.currentPage === LEADERS
                          ? styles.linkActive
                          : ""
                      ]}
                    >
                      LEADERS
                    </Text>
                    <View style={styles.undeline} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {this.isReady && (
              <View style={styles.navbarContainer}>
                {game && (
                  <TouchableOpacity style={styles.link} onPress={this.undoGoal}>
                    <View>
                      <Text style={styles.linkText}>UNDO GOAL</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Logo />
                </View>
                {game && (
                  <TouchableOpacity
                    style={styles.link}
                    onPress={this.finishGame}
                  >
                    <View>
                      <Text style={[styles.linkText]}>FINISH GAME</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {game && (
            <CongratsModal
              visible={game.completed}
              onRematch={this.rematch}
              onFinish={this.finishGame}
            />
          )}
          <FinishModal
            visible={this.state.finishModalVisible}
            onRequestClose={() => {
              this.setState({
                finishModalVisible: false
              });
            }}
          />
        </View>
      );
    }
  }
);

export default NewGame;
