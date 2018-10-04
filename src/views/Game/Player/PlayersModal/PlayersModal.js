import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { observer } from "mobx-react";

import UserAvatar from "../../../../components/UserAvatar";
import { store } from "../../../../store";
import IconCross from "../../../../assets/IconCross";
import IconSearch from "../../../../assets/IconSearch";

const UserListModal = observer(
  class UserListModalComponent extends Component {
    state = {
      searchStr: "",
      page: 0,
      offset: 50
    }

    userKeyExtractor = item => item.id.toString();

    renderUser = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => this.resetSearchAndSelectUser(item)}>
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

    resetState = () => {
      this.setState({
        searchStr: "",
        page: 0
      })
    }

    resetSearchAndSelectUser = (user) => {
      this.resetState();
      this.props.onSelect(user)
    }

    resetSearchAndClose = () => {
      this.resetState();
      this.props.close();
    };

    reloadUsersList = () => {
      this.resetState();
      store.loadUsers(true)
    }

    renderMoreUsers = () => {
      if (this.state.offset * this.state.page < store.users.length) {
        this.setState(({ page }) => ({ page: page + 1 }))
      }
    }

    render() {
      const { visible } = this.props;

      let usersList = store.users
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(
          ({ name }) =>
            name.toLowerCase().indexOf(this.state.searchStr.toLowerCase()) >= 0
        );

      if (this.state.offset * this.state.page < store.users.length) {
        usersList = usersList.slice(0, this.state.offset * this.state.page);
      }

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
              onPress={this.reloadUsersList}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 40,
                height: 40,
                zIndex: 3,
              }}
            />
            <TouchableOpacity
              onPress={this.resetSearchAndClose}
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
                width: 380,
                height: 100,
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <IconSearch
                style={{
                  marginLeft: 15
                }}
              />
              <TextInput
                style={{
                  color: "white",
                  fontFamily: "GothamPro-Bold",
                  paddingLeft: 35,
                  fontSize: 24
                }}
                placeholder="SEARCH"
                autoCorrect={false}
                placeholderTextColor="rgba(255,255,255, .3)"
                onChangeText={this.searchUser}
                value={this.state.searchStr}
                autoFocus
              />
            </View>
            <KeyboardAvoidingView behavior="padding" enabled>
              <FlatList
                data={usersList}
                keyExtractor={this.userKeyExtractor}
                renderItem={this.renderUser}
                style={{ flex: 1 }}
                contentContainerStyle={{
                  paddingTop: 50,
                  paddingBottom: 50
                }}
                onEndReached={this.renderMoreUsers}
                keyboardShouldPersistTaps="handled"
              />
            </KeyboardAvoidingView>
          </View>
        </Modal>
      );
    }
  }
);

export default UserListModal;
