import React, { Component } from "react";
import { View, Text, TouchableOpacity, Vibration } from "react-native";

import IconAdd from "./svg/IconAdd";
import LeftTopCorner from "./svg/LeftTopCorner";
import LeftBottomCorner from "./svg/LeftBottomCorner";
import RightTopCorner from "./svg/RightTopCorner";
import RightBottomCorner from "./svg/RightBottomCorner";

import UserListModal from "./UserListModal";
import UserAvatar from "../components/UserAvatar";
import Button from "../components/Button";
import {
  TEAM_BLUE,
  POSITION_DEFENDER,
  DURATION_VIBRATE_GOAL,
  DURATION_VIBRATE_OWN_GOAL,
  FREEZE_GOALS_BUTTON,
  PADDIND_GOAL_BUTTON
} from "../constants";
import { gameStore } from "../store";
import { playGoalSound, playOwnSound } from "../utils/sounds";

class Player extends Component {
  state = { user: null, userListVisible: false, isButtonFreeze: false };

  selectUser = user => {
    this.setState({ userListVisible: false });
    this.props.onSelect(user);
  };

  closeUserList = () => {
    this.setState({ userListVisible: false });
  };

  openUserList = () => {
    this.setState({ userListVisible: true });
  };

  freezeButton = async delay => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  addGoal = async () => {
    playGoalSound();
    Vibration.vibrate(DURATION_VIBRATE_GOAL);
    this.setState({ isButtonFreeze: true });
    const { user } = this.props;
    await Promise.all([
      gameStore.addGoal(user.id),
      this.freezeButton(FREEZE_GOALS_BUTTON)
    ]);
    this.setState({ isButtonFreeze: false });
  };

  addOwnGoal = async () => {
    playOwnSound();
    Vibration.vibrate(DURATION_VIBRATE_OWN_GOAL);
    this.setState({ isButtonFreeze: true });
    const { user } = this.props;
    await Promise.all([
      gameStore.addOwnGoal(user.id),
      this.freezeButton(FREEZE_GOALS_BUTTON)
    ]);
    this.setState({ isButtonFreeze: false });
  };

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
      ready,
      goals
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          overflow: "hidden",
          ...style
        }}
      >
        {left &&
          top && (
            <View style={{ position: "absolute", left: 0, top: 0 }}>
              <LeftTopCorner />
            </View>
          )}
        {left &&
          bottom && (
            <View style={{ position: "absolute", left: 0, bottom: 0 }}>
              <LeftBottomCorner />
            </View>
          )}
        {right &&
          top && (
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <RightTopCorner />
            </View>
          )}
        {right &&
          bottom && (
            <View style={{ position: "absolute", right: 0, bottom: 0 }}>
              <RightBottomCorner />
            </View>
          )}

        <View
          style={{
            position: "absolute",
            left: left ? -20 : null,
            top: top ? 94 : null,
            right: right ? -20 : null,
            bottom: bottom ? 94 : null,
            zIndex: 3,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              width: 48,
              fontFamily: "GothamPro-Black",
              fontSize: 30,
              letterSpacing: 1,
              color: team === TEAM_BLUE ? "#235cff" : "#ff234a",
              [left ? "marginLeft" : "marginRight"]: 20,
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.3)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 0
            }}
          >
            {goals}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            left: 48,
            top: top ? 48 : null,
            right: 48,
            bottom: bottom ? 48 : null,
            flexDirection: left ? "row" : "row-reverse",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.openUserList}>
            {user ? (
              <UserAvatar
                user={user}
                size={120}
                color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
              />
            ) : (
              <View
                style={{
                  backgroundColor: team === TEAM_BLUE ? "#235cff" : "#ff234a",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 60,
                  width: 120,
                  height: 120
                }}
              >
                <IconAdd />
              </View>
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: "GothamPro-Black",
                fontSize: 18,
                lineHeight: 22,
                letterSpacing: 1,
                color: team === TEAM_BLUE ? "#235cff" : "#ff234a",
                [left ? "marginLeft" : "marginRight"]: 20,
                textAlign: left ? "left" : "right"
              }}
            >
              {!user &&
                (position === POSITION_DEFENDER ? "DEFENDER" : "FORWARD")}
              {user && user.name.toUpperCase()}
            </Text>
            {user && (
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "GothamPro-Black",
                  fontSize: 12,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: team === TEAM_BLUE ? "#235cff" : "#ff234a",
                  [left ? "marginLeft" : "marginRight"]: 20,
                  textAlign: left ? "left" : "right"
                }}
              >
                {position === POSITION_DEFENDER ? "DEFENDER" : "FORWARD"}
              </Text>
            )}
          </View>
          <UserListModal
            visible={this.state.userListVisible}
            onSelect={this.selectUser}
            selectedUserIds={this.props.selectedUserIds}
            close={this.closeUserList}
          />
        </View>

        {ready && (
          <View
            style={{
              position: "absolute",
              left: left ? 72 - PADDIND_GOAL_BUTTON : null,
              top: top ? 226 - PADDIND_GOAL_BUTTON : null,
              right: right ? 72 - PADDIND_GOAL_BUTTON : null,
              bottom: bottom ? 226 - PADDIND_GOAL_BUTTON : null
            }}
          >
            <Button
              primary
              onPress={!this.state.isButtonFreeze && this.addGoal}
              color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
              width={240}
              padding={PADDIND_GOAL_BUTTON}
            >
              GOAL
            </Button>
          </View>
        )}
        {ready && (
          <View
            style={{
              position: "absolute",
              left: left ? 72 : null,
              top: top ? 320 : null,
              right: right ? 72 : null,
              bottom: bottom ? 320 : null
            }}
          >
            <Button
              onPress={!this.state.isButtonFreeze && this.addOwnGoal}
              color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
              width={240}
            >
              OWN
            </Button>
          </View>
        )}
      </View>
    );
  }
}

export default Player;
