import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator
} from "react-native";
import { observer } from "mobx-react";

import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import IconCross from "./svg/IconCross";

const UserListModal = observer(
  class UserListModalComponent extends Component {
    userKeyExtractor = item => item.id.toString();
    renderUser = ({ item }) => {
      const { selectedUserIds, onSelect } = this.props;
      const disabled = selectedUserIds.includes(item.id);
      return (
        <TouchableOpacity disabled={disabled} onPress={() => onSelect(item)}>
          <View style={{ alignItems: "center", opacity: disabled ? 0.4 : 1 }}>
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
    render() {
      const { visible, close } = this.props;
      return (
        <Modal animationType="fade" transparent={false} visible={visible}>
          <View style={{ flex: 1, backgroundColor: "#191919" }}>
            <TouchableOpacity
              onPress={close}
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
            <FlatList
              data={store.users.sort((a, b) => a.name.localeCompare(b.name))}
              keyExtractor={this.userKeyExtractor}
              renderItem={this.renderUser}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 50
              }}
            />
          </View>
        </Modal>
      );
    }
  }
);

export default UserListModal;
