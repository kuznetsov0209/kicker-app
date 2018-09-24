import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Navbar.styles";

class NavbarLink extends Component {
  render() {
    const { title, active, ...props } = this.props;
    return (
      <TouchableOpacity style={styles.link} {...props}>
        <View>
          <Text style={[styles.linkText, active ? styles.linkActive : null]}>
            {title}
          </Text>
          {active && <View style={styles.undeline} />}
        </View>
      </TouchableOpacity>
    );
  }
}

export default NavbarLink;
