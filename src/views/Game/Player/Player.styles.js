import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import IconAdd from "./assets/IconAdd";
import UserAvatar from "../../../components/UserAvatar";
import Button from "../../../components/Button";
import { TEAM_BLUE, POSITION_FORWARD } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#0e0e0e"
  },
  containerGray: {
    backgroundColor: "#191919"
  },
  iconLeftTop: {
    position: "absolute",
    left: 0,
    top: 0
  },
  iconLeftBottom: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  iconRightTop: {
    position: "absolute",
    right: 0,
    top: 0
  },
  iconRightBottom: {
    position: "absolute",
    right: 0,
    bottom: 0
  },

  addButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    width: 120,
    height: 120
  },

  playerView: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    alignItems: "center",
    padding: 48
  },
  playerViewReverse: {
    flexDirection: "column-reverse"
  },

  userContainer: {
    flexDirection: "row"
  },
  userContainerReverse: {
    flexDirection: "row-reverse"
  },
  userName: {
    fontFamily: "GothamPro-Black",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 1,
    flex: 1,
    alignSelf: "center"
  },
  userNameAlignLeft: {
    marginLeft: 20,
    textAlign: "left"
  },
  userNameAlignRight: {
    marginRight: 20,
    textAlign: "right"
  },

  goalsContainer: {
    position: "absolute",
    bottom: -15,
    left: 0,
    right: 0,
    alignItems: "center"
  },
  goals: {
    borderRadius: 15,
    height: 30,
    minWidth: 40,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  goalsText: {
    fontFamily: "GothamPro-Black",
    color: "white",
    fontSize: 22,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    textAlign: "center"
  }
});

export const PlayerContainer = ({ reverse, ...props }) => (
  <View
    style={reverse ? styles.userContainerReverse : styles.userContainer}
    {...props}
  />
);

export const PlayerName = ({ alignRight, team, ...props }) => (
  <Text
    numberOfLines={2}
    style={[
      styles.userName,
      alignRight ? styles.userNameAlignRight : styles.userNameAlignLeft,
      { color: team === TEAM_BLUE ? "#235cff" : "#ff234a" }
    ]}
    {...props}
  />
);

export const AddPlayerButton = ({ team, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        {
          backgroundColor: team === TEAM_BLUE ? "#235cff" : "#ff234a"
        },
        styles.addButton
      ]}
    >
      <IconAdd />
    </View>
  </TouchableOpacity>
);

export const ChangePlayerButton = ({ user, team, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <UserAvatar size={120} user={user} team={team} />
  </TouchableOpacity>
);

export const PlayerAvatar = ({ user, team, position, goals }) => (
  <View>
    <UserAvatar size={120} user={user} team={team} />
    <View style={styles.goalsContainer}>
      <View
        style={[
          styles.goals,
          {
            backgroundColor: team === TEAM_BLUE ? "#235cff" : "#ff234a"
          }
        ]}
      >
        <Text style={styles.goalsText}>{goals}</Text>
      </View>
    </View>
  </View>
);

export const ButtonsContainer = ({ reverse, ...props }) => (
  <View
    style={{
      ...StyleSheet.absoluteFillObject,
      flexDirection: reverse ? "column-reverse" : "column",
      alignItems: "center"
    }}
    {...props}
  />
);

export const GoalButton = ({ reverse, team, onPress, ...props }) => (
  <View
    style={{
      height: 320,
      paddingVertical: 30
    }}
    {...props}
  >
    <Button
      primary
      onPress={onPress}
      color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
      style={{
        flex: 1,
        justifyContent: reverse ? "flex-start" : "flex-end",
        width: 240
      }}
    >
      GOAL
    </Button>
  </View>
);

export const PlayerView = ({ reverse, ...props }) => (
  <View
    style={[styles.playerView, reverse ? styles.playerViewReverse : null]}
    {...props}
  />
);

export default styles;
