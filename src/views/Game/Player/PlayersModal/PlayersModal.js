import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  TextInput
} from "react-native";
import { observer } from "mobx-react";

import UserAvatar from "../../../../components/UserAvatar";
import { store } from "../../../../store";
import IconCross from "../../../../assets/IconCross";
import IconSearch from "../../../../assets/IconSearch";

const UserListModal = observer(
  class UserListModalComponent extends Component {
    state = {
      searchStr: ""
    };

    userKeyExtractor = item => item.id.toString();

    renderUser = ({ item }) => {
      const { onSelect } = this.props;
      return (
        <TouchableOpacity onPress={() => onSelect(item)}>
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

    searchUser = value => {
      this.setState({ searchStr: value });
    };

    render() {
      const { visible, close } = this.props;

      const usersList = store.users
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(
          ({ name }) =>
            name.toLowerCase().indexOf(this.state.searchStr.toLowerCase()) >= 0
        );

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
            <View
              style={{
                marginTop: 36,
                marginBottom: 36,
                width: 380,
                flexDirection: "row"
              }}
            >
              <IconSearch
                style={{
                  marginLeft: 15,
                  marginRight: 35
                }}
              />
              <TextInput
                style={{
                  color: "white",
                  fontFamily: "GothamPro-Bold",
                  fontSize: 24
                }}
                placeholder="SEARCH"
                placeholderTextColor="rgba(255,255,255, .3)"
                onChangeText={this.searchUser}
                value={this.state.searchStr}
              />
            </View>
            <FlatList
              data={usersList}
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
