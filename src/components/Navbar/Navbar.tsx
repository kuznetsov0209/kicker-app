import React, { Component } from "react";
import { View } from "react-native";
import styles from "./Navbar.styles";

class Navbar extends Component {
  render() {
    return (
      <View style={styles.navbar}>
        <View style={styles.navbarContainer} {...this.props} />
      </View>
    );
  }
}

export default Navbar;
