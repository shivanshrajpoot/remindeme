import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { PreferencesContext } from '@helpers';
import { Platform, I18nManager } from 'react-native';
import { DrawerItems } from '@components';
import BottomTabNavigator from './BottomTabNavigator';

export default createDrawerNavigator(
  { Home: BottomTabNavigator },
  {
    contentComponent: () => (
      <PreferencesContext.Consumer>
        {preferences => (
          <DrawerItems
            toggleTheme={preferences.theme}
            toggleRTL={preferences.rtl}
            isRTL={preferences.isRTL}
            isDarkTheme={preferences.isDarkTheme}
          />
        )}
      </PreferencesContext.Consumer>
    ),
    // set drawerPosition to support rtl toggle on android
    drawerPosition:
      Platform.OS === 'android' && (I18nManager.isRTL ? 'right' : 'left'),
  }
);