import React, { Component } from "react";
import { View } from "react-native";
import { observer } from "mobx-react";

import LeftTopCorner from "./assets/LeftTopCorner";
import LeftBottomCorner from "./assets/LeftBottomCorner";
import RightTopCorner from "./assets/RightTopCorner";
import RightBottomCorner from "./assets/RightBottomCorner";

import PlayersModal from "./PlayersModal";
import QRCodeModal from "./QRCodeModal";
import {
  TEAM_RED,
  TEAM_BLUE,
  POSITION_DEFENDER,
  POSITION_FORWARD
} from "../../../constants";
import { gameStore } from "../../../store";
import Button from "../../../components/Button";
import styles, {
  AddPlayerButton,
  ButtonsContainer,
  ChangePlayerButton,
  GoalButton,
  PlayerAvatar,
  PlayerContainer,
  PlayerName,
  PlayerView
} from "./Player.styles";

type UserType = any;

interface PlayerProps {
  team: number;
  user?: UserType;
  position: number;
  onSelect: (payload: {
    user: UserType;
    position: number;
    team: number;
  }) => void;
}

@observer
class Player extends Component<PlayerProps> {
  state = { userListVisible: false };

  get goals(): number | undefined {
    const { user } = this.props;
    return user && gameStore.game?.goalsByUserId[user.id].length;
  }

  get isLeft() {
    return this.props.team === TEAM_RED;
  }

  get isRight() {
    return this.props.team === TEAM_BLUE;
  }

  get isTop() {
    return (
      (this.props.team === TEAM_RED &&
        this.props.position === POSITION_DEFENDER) ||
      (this.props.team === TEAM_BLUE &&
        this.props.position === POSITION_FORWARD)
    );
  }

  get isBottom() {
    return (
      (this.props.team === TEAM_BLUE &&
        this.props.position === POSITION_DEFENDER) ||
      (this.props.team === TEAM_RED && this.props.position === POSITION_FORWARD)
    );
  }

  get userNameOrPosition() {
    const { position, team, user } = this.props;
    if (user) {
      return user.name.toUpperCase();
    } else {
      return position === POSITION_DEFENDER ? "DEFENDER" : "FORWARD";
    }
  }

  selectUser = (user: UserType) => {
    const { position, team } = this.props;
    this.props.onSelect({ user, position, team });
    this.closeUserList();
  };

  closeUserList = () => {
    this.setState({ userListVisible: false });
  };

  openUserList = () => {
    this.setState({ userListVisible: true });
  };

  addGoal = async () => {
    const { user } = this.props;
    gameStore.game?.addGoal(user.id);
  };

  addOwnGoal = async () => {
    const { user } = this.props;
    gameStore.game?.addOwnGoal(user.id);
  };

  renderIcon() {
    if (this.isLeft && this.isTop) {
      return <LeftTopCorner style={styles.iconLeftTop} />;
    } else if (this.isLeft && this.isBottom) {
      return <LeftBottomCorner style={styles.iconLeftBottom} />;
    } else if (this.isRight && this.isTop) {
      return <RightTopCorner style={styles.iconRightTop} />;
    } else if (this.isRight && this.isBottom) {
      return <RightBottomCorner style={styles.iconRightBottom} />;
    }
  }

  render() {
    const { user, team, position } = this.props;

    return (
      <View
        style={[
          styles.container,
          ((this.isTop && this.isLeft) || (this.isRight && this.isBottom)) &&
            styles.containerGray
        ]}
      >
        {this.renderIcon()}

        <PlayerView reverse={this.isBottom}>
          <PlayerContainer reverse={this.isRight}>
            {user ? (
              gameStore.game ? (
                <PlayerAvatar user={user} team={team} goals={this.goals} />
              ) : (
                <ChangePlayerButton
                  user={user}
                  onPress={this.openUserList}
                  team={team}
                />
              )
            ) : (
              <AddPlayerButton onPress={this.openUserList} team={team} />
            )}

            <PlayerName alignRight={this.isRight} team={team}>
              {this.userNameOrPosition}
            </PlayerName>
          </PlayerContainer>

          {/* <PlayersModal
            visible={this.state.userListVisible}
            onSelect={this.selectUser}
            close={this.closeUserList}
          /> */}
          <QRCodeModal
            visible={this.state.userListVisible}
            close={this.closeUserList}
            team={team}
            position={position}
          />
        </PlayerView>

        {gameStore.game && (
          <ButtonsContainer reverse={this.isBottom}>
            <GoalButton
              reverse={this.isBottom}
              team={team}
              onPress={this.addGoal}
            />

            <Button
              onPress={this.addOwnGoal}
              color={team === TEAM_BLUE ? "#235cff" : "#ff234a"}
              style={{ width: 240 }}
            >
              OWN
            </Button>
          </ButtonsContainer>
        )}
      </View>
    );
  }
}

export default Player;
