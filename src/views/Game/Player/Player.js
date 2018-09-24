import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react";

import IconAdd from "./assets/IconAdd";
import LeftTopCorner from "./assets/LeftTopCorner";
import LeftBottomCorner from "./assets/LeftBottomCorner";
import RightTopCorner from "./assets/RightTopCorner";
import RightBottomCorner from "./assets/RightBottomCorner";

import PlayersModal from "./PlayersModal";
import UserAvatar from "../../../components/UserAvatar";
import Button from "../../../components/Button";
import { TEAM_BLUE, POSITION_DEFENDER } from "../../../constants";
import { gameStore } from "../../../store";
import { playGoalSound, playOwnSound } from "../../../utils/sounds";
import styles from "./Player.styles";

const Player = observer(
  class PlayerComponent extends Component {
    state = { userListVisible: false };

    get game() {
      return gameStore.game;
    }

    get goals() {
      const { user } = this.props;
      return user && this.game && this.game.goalsByUserId[user.id].length;
    }

    selectUser = user => {
      const { position, team } = this.props;
      this.setState({ userListVisible: false });
      this.props.onSelect({ user, position, team });
    };

    closeUserList = () => {
      this.setState({ userListVisible: false });
    };

    openUserList = () => {
      this.setState({ userListVisible: true });
    };

    addGoal = async () => {
      playGoalSound();

      const { user } = this.props;
      this.game.addGoal(user.id);
    };

    addOwnGoal = async () => {
      playOwnSound();

      const { user } = this.props;
      this.game.addOwnGoal(user.id);
    };

    renderIcon() {
      const { left, top, right, bottom } = this.props;

      if (left && top) {
        return <LeftTopCorner style={styles.iconLeftTop} />;
      } else if (left && bottom) {
        return <LeftBottomCorner style={styles.iconLeftBottom} />;
      } else if (right && top) {
        return <RightTopCorner style={styles.iconRightTop} />;
      } else if (right && bottom) {
        return <RightBottomCorner style={styles.iconRightBottom} />;
      }
    }

    renderGoals() {
      const { team } = this.props;

      return (
        <View
          style={{
            position: "absolute",
            bottom: -15,
            left: 0,
            right: 0,
            alignItems: "center"
          }}
        >
          <View
            style={{
              borderRadius: 15,
              height: 30,
              minWidth: 40,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: team === TEAM_BLUE ? "#235cff" : "#ff234a"
            }}
          >
            <Text
              style={{
                fontFamily: "GothamPro-Black",
                color: "white",
                fontSize: 22,
                textShadowColor: "rgba(0, 0, 0, 0.3)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 0,
                textAlign: "center"
              }}
            >
              {this.goals}
            </Text>
          </View>
        </View>
      );
    }

    renderButtons() {
      const { team, ready, top } = this.props;

      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            flexDirection: top ? "column" : "column-reverse",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: 320,
              paddingVertical: 30
            }}
          >
            <Button
              primary
              onPress={this.addGoal}
              color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
              style={{
                flex: 1,
                justifyContent: top ? "flex-end" : "flex-start",
                width: 240
              }}
            >
              GOAL
            </Button>
          </View>

          <Button
            onPress={this.addOwnGoal}
            color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
            style={{ width: 240 }}
          >
            OWN
          </Button>
        </View>
      );
    }

    render() {
      const {
        user,
        style,
        position,
        team,
        left,
        top,
        right,
        bottom,
        ready
      } = this.props;

      return (
        <View style={[styles.container, style]}>
          {this.renderIcon()}

          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              flexDirection: top ? "column" : "column-reverse",
              alignItems: "center",
              padding: 48
            }}
          >
            <View
              style={{
                flexDirection: left ? "row" : "row-reverse"
              }}
            >
              <TouchableOpacity onPress={this.openUserList}>
                {user ? (
                  <View>
                    <UserAvatar
                      user={user}
                      size={120}
                      color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
                    />
                    {ready && this.renderGoals()}
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        backgroundColor:
                          team === TEAM_BLUE ? "#235cff" : "#ff234a"
                      },
                      styles.addButton
                    ]}
                  >
                    <IconAdd />
                  </View>
                )}
              </TouchableOpacity>
              <View style={{ flex: 1, alignSelf: "center" }}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.userName,
                    {
                      color: team === TEAM_BLUE ? "#235cff" : "#ff234a",
                      [left ? "marginLeft" : "marginRight"]: 20,
                      textAlign: left ? "left" : "right"
                    }
                  ]}
                >
                  {!user &&
                    (position === POSITION_DEFENDER ? "DEFENDER" : "FORWARD")}
                  {user && user.name.toUpperCase()}
                </Text>
              </View>
              {this.state.userListVisible && (
                <PlayersModal
                  visible
                  onSelect={this.selectUser}
                  close={this.closeUserList}
                />
              )}
            </View>
          </View>

          {ready && this.renderButtons()}
        </View>
      );
    }
  }
);

export default Player;
