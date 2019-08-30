import React, { Component, Fragment } from 'react';
import { ScrollView, View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { Snackbar, Banner, Portal, ActivityIndicator, Colors } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import { connect } from 'react-redux';
import { loginUser } from '@actions';
import { navigationService } from '@helpers';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(){
    super();
    this.state = {
      isSigninInProgress: false,
      visible: true,
      snackVisible: false,
    }
  }

  _login = async () => {
    const { loginUser, navigation } = this.props;
    console.log('clicked')
    this.setState({isSigninInProgress: true});
    let isLoggedIn = await loginUser();
    this.setState({isSigninInProgress: false});
    if (isLoggedIn) {
      navigationService.navigate('App');
    }else {

    }
  }

  render() {
    return (
      <Fragment >
      <Portal>
        <View style={{ flex:1, alignItems:'center', flexDirection:'column', justifyContent:'center' }}>
          <ActivityIndicator animating={this.state.isSigninInProgress} color={Colors.red800} />
        </View>
      </Portal>
      <Portal>
        <Banner
          visible={this.state.visible}
          actions={[
            {
              label: 'Okay',
              onPress: () => this.setState({ visible: false }),
            },
            {
              label: 'Visit Us',
              onPress: () => {
                Linking.canOpenURL('https://www.webtexo.com/').then(supported => {
                  if (supported) {
                    Linking.openURL('https://www.webtexo.com/');
                  } else {
                    console.log("Don't know how to open URI: " + this.props.url);
                  }
                });
              },
            },
          ]}
          image={({ size }) =>
            <Image
              source={{ uri: 'https://media.licdn.com/dms/image/C560BAQG5l00B2eLcpQ/company-logo_200_200/0?e=2159024400&v=beta&t=UTkjyNiJsWa2xhRegzAMK9YK0LZXv8cfZXy_Wf5o_sg' }}
              style={{
                width: size,
                height: size,
              }}
            />
          }
        >
          Please sign in using your google account. {'\n'}
          So that we can save your data on cloud.
        </Banner>
      </Portal>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/logo.png')} style={[styles.logo]}/>
            <Text style={styles.welcome}>
              Welcome to RemindMe
            </Text>
            <Text style={styles.instructions}>
              Let's get you started...
            </Text>
          </View>
          <View style={styles.modules}>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._login}
              disabled={this.state.isSigninInProgress} />
          </View>
          <Text style={styles.copyright}>
            Copyright © 2019 WebTexo{'\n'}
            RemindMe®Version 0.1
          </Text>
          <Snackbar
            visible={this.state.snackVisible}
            onDismiss={() => this.setState({ snackVisible: false })}
          >
            Something went wrong! Please try again.
          </Snackbar>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 150,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  copyright: {
    textAlign: 'center',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  }
});

export default connect(() => ({}), { loginUser })(LoginScreen);

