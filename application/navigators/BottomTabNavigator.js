import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AddNewReminder, Home, MyProfile } from '@screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default createMaterialBottomTabNavigator({
	AddNewReminder: {
		screen: AddNewReminder,
		navigationOptions: {
			title: 'Add New',
			tabBarIcon: <Icon size={25} name="camera-alt" />
		}
	},
	Home: { 
		screen: Home,
		navigationOptions: {
			title: 'All',
			tabBarIcon: <Icon size={25} name="list" />
		}
	},
	Profile: {
		screen: MyProfile,
		navigationOptions: {
			title: 'My Profile',
			tabBarIcon: <Icon size={25} name="person" />
		}
	}
}, {
	initialRouteName: 'Home',
	activeColor: '#FDD835',
	inactiveColor: '#3E2465',
	barStyle: { backgroundColor: '#00BCD4' },
});