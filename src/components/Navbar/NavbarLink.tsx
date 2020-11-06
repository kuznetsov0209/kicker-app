import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import styles from "./Navbar.styles";

interface NavbarLinkProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

// todo: use PureComponent
class NavbarLink extends Component<NavbarLinkProps> {
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
