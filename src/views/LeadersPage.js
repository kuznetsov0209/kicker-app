import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { observer } from "mobx-react";
import { statsStore } from "../store/statsStore";
import UserAvatar from "../components/UserAvatar";
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "GothamPro-Medium",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingTop: 21
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "GothamPro-Medium",
    fontSize: 25,
    marginBottom: 10
  }
});
const LeadersPage = observer(
  class LeadersPageComponent extends Component {
    componentDidMount() {
      statsStore.loadStats();
    }
    render() {
      return (
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#191919",
              justifyContent: "center",
              paddingTop: 30,
              paddingBottom: 30
            }}
          >
            <View>
              <Text style={styles.title}>Leaders List</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>#</Text>
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.textStyle}>User</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>Rating</Text>
              </View>
            </View>

            {statsStore.usersStats
              .sort((a, b) => {
                return b.rating - a.rating;
              })
              .map((user, index) => {
                return (
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textStyle}>{index + 1}</Text>
                    </View>

                    <View
                      style={{
                        flex: 4,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <UserAvatar user={user} size={60} />
                      <View style={{ marginLeft: 20 }}>
                        <Text
                          numberOfLines={2}
                          style={[styles.textStyle, { paddingBottom: 25 }]}
                        >
                          {user.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textStyle}>{user.rating}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      );
    }
  }
);
export default LeadersPage;
