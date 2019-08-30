import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { AuthLoadingScreen, LoginScreen } from '@screens';
import DrawerNavigator from "./DrawerNavigator";

const AuthStack = createStackNavigator({
  Login: LoginScreen
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));