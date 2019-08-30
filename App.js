import * as React from 'react';
import { StatusBar, I18nManager, AsyncStorage, Platform } from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
  type Theme,
} from 'react-native-paper';
import { createDrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import RNRestart from 'react-native-restart';

// Store Setup
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { PersistGate } from 'redux-persist/integration/react';
import { rrfProps, configureStore, navigationService, PreferencesContext } from '@helpers';
import { SwitchAuth } from '@navigators';

const persistantStore = configureStore();
const { store, persistor } = persistantStore;
const ConcurrentMode = React.unstable_ConcurrentMode;

const CustomTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00BCD4',
    accent: '#4DD0E1',
  }
};

type State = {
  theme: Theme,
  rtl: boolean,
};

export default class App extends React.Component<{}, State> {
  state = {
    theme: CustomTheme,
    rtl: I18nManager.isRTL,
  };

  async componentDidMount() {
    StatusBar.setBarStyle('light-content');

    try {
      const prefString = await AsyncStorage.getItem('preferences');
      const preferences = JSON.parse(prefString);

      if (preferences) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState(state => ({
          theme: preferences.theme === 'dark' ? DarkTheme : CustomTheme,
          rtl:
            typeof preferences.rtl === 'boolean' ? preferences.rtl : state.rtl,
        }));
      }
    } catch (e) {
      // ignore error
    }
  }

  _savePreferences = async () => {
    try {
      AsyncStorage.setItem(
        'preferences',
        JSON.stringify({
          theme: this.state.theme === DarkTheme ? 'dark' : 'light',
          rtl: this.state.rtl,
        })
      );
    } catch (e) {
      // ignore error
    }
  };

  _toggleTheme = () =>
    this.setState(
      state => ({
        theme: state.theme === DarkTheme ? CustomTheme : DarkTheme,
      }),
      this._savePreferences
    );

  _toggleRTL = () =>
    this.setState(
      state => ({
        rtl: !state.rtl,
      }),
      async () => {
        await this._savePreferences();

        I18nManager.forceRTL(this.state.rtl);
        RNRestart.Restart();
      }
    );

  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={this.state.theme}>
              <PreferencesContext.Provider
                value={{
                  theme: this._toggleTheme,
                  rtl: this._toggleRTL,
                  isRTL: this.state.rtl,
                  isDarkTheme: this.state.theme === DarkTheme,
                }}
              >
                <SwitchAuth
                  persistenceKey={'myRandmoKey'}
                  ref={navigatorRef => navigationService.setTopLevelNavigator(navigatorRef) }
                />
              </PreferencesContext.Provider>
            </PaperProvider>
          </PersistGate>
          </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}