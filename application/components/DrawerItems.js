/* @flow */

import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Drawer,
  withTheme,
  Switch,
  TouchableRipple,
  Text,
  type Theme,
  Avatar,
} from 'react-native-paper';
import { connect } from 'react-redux';

type Props = {
  theme: Theme,
  toggleTheme: Function,
  toggleRTL: Function,
  isRTL: boolean,
  isDarkTheme: boolean,
};

type State = {
  open: boolean,
  drawerItemIndex: number,
};


class DrawerItems extends React.Component<Props, State> {
  state = {
    open: false,
    drawerItemIndex: 0,
  };

  _setDrawerItem = index => this.setState({ drawerItemIndex: index });

  render() {
    const { theme: { colors }, user } = this.props;

    return (
      <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
        {user && <View style={{ flex:0.2, height:50, paddingLeft:20, margin:10, flexDirection: 'row', justifyContent:'center', alignItems:'flex-start' }}>
          <Avatar.Image size={50} source={{ uri: user.photoURL }} />
          <Drawer.Item label={ user.displayName }/>
        </View>}
        <Drawer.Section title="RemindMe © WebTexo"/>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={this.props.toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={this.props.isDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={this.props.toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={this.props.isRTL} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = ({firebase:{auth}}) => ({
  user: auth
});

export default connect(mapStateToProps, () => ({}))(withTheme(DrawerItems));
