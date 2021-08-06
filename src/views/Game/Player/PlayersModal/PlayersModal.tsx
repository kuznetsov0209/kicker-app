import { cast, SnapshotOrInstance } from "mobx-state-tree";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { BarCodeReadEvent } from "react-native-camera";
import { observer } from "mobx-react";

import UserAvatar from "../../../../components/UserAvatar";
import QRScanner from "../../../../components/QRScanner";
import { store } from "../../../../store";
import IconCross from "../../../../assets/IconCross";
import IconSearch from "../../../../assets/IconSearch";
import { computed, observable } from "mobx";
import User from "../../../../store/user";

type UserType = SnapshotOrInstance<typeof User>;

interface UserListModalProps {
  onSelect: (user: UserType) => void;
  close: () => void;
  visible: boolean;
}

@observer
class UserListModal extends Component<UserListModalProps> {
  offset = 50;

  @observable
  page = 1;

  @computed
  get users() {
    return store.users.slice(0, this.offset * this.page);
  }

  userKeyExtractor = (item: UserType) => item.id.toString();

  renderUser = ({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity onPress={() => this.selectUser(item)}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 380,
              height: 100
            }}
          >
            <UserAvatar user={item} size={60} />
            <View style={{ marginLeft: 20 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: "GothamPro-Medium",
                  fontSize: 18,
                  color: "white"
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  resetState = () => {
    this.page = 1;
  };

  selectUser = (user: UserType) => {
    this.resetState();
    this.props.onSelect(user);
  };

  selectUserFromQR = async ({ data }: BarCodeReadEvent) => {
    try {
      let [, name, externalId] = data.split(",");
      let user = store.users.find(user => user.externalId === externalId);
      if (!user) {
        user = await store.addUserByExternalId({ externalId, name });
      }
      if (user) {
        this.selectUser(user);
      }
    } catch (error) {
      Alert.alert("Ooops! " + error.message);
    }
  };

  close = () => {
    this.resetState();
    this.props.close();
  };

  renderMoreUsers = () => {
    if (this.offset * this.page < store.users.length) {
      this.page++;
    }
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal animationType="fade" transparent={false} visible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#191919",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.close}
            style={{
              position: "absolute",
              right: 30,
              top: 30,
              zIndex: 2
            }}
          >
            <IconCross />
          </TouchableOpacity>

          {store.users.length === 0 && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator />
            </View>
          )}
          <KeyboardAvoidingView behavior="padding" enabled>
            <View
              style={{
                flex: 1
              }}
            >
              <QRScanner onRead={this.selectUserFromQR} />
            </View>
            {/* <FlatList
              data={this.users}
              keyExtractor={this.userKeyExtractor}
              renderItem={this.renderUser}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 50
              }}
              onEndReached={this.renderMoreUsers}
              keyboardShouldPersistTaps="handled"
            /> */}
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}

export default UserListModal;
