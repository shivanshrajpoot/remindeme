import React, { Fragment } from 'react';
import { Linking, ScrollView, View, FlatList, Image, Dimensions, StyleSheet, ImageBackground, RefreshControl } from 'react-native';
import { Snackbar, Caption, Banner, BottomNavigation, Paragraph, Card, Title, IconButton } from 'react-native-paper';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Reminder } from '@components';
import { _removeReminder } from '@actions';
import { firestoreConnect } from 'react-redux-firebase'
import { get, concat } from 'lodash';
import { firestoreDataSelector, firestoreOrderedSelector } from 'redux-firestore';
import { _getFirebaseAuthUid } from '@helpers';

type State = {};

const NoData = (props) => (
      <Banner
        visible={true}
        actions={[
          {
            label: 'Add New',
            onPress: () => {
              props.navigate('AddNewReminder');
            },
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
        You have not added any reminder yet.{'\n'}
        Please add a new one.{'\n'}
        You can also visit our website for more cool apps like this.
    </Banner>
);

class Home extends React.PureComponent<{}, State> {
  state = {
    refreshing: false,
    snackVisible: false,
  }

  _showSnack = () => this.setState({ snackVisible: true })
  _hideSnack = () => this.setState({ snackVisible: false })

  renderReminders = ({item}) => (<Reminder onDelete={() => this._onDelete(item.id)} {...item} />)

  _toggleRefresh = () => this.setState(({ refreshing }) => ({refreshing: !refreshing}))

  _onRefresh = () => {
    this._toggleRefresh()
    this.forceUpdate();
    this._toggleRefresh()
  }

  _onDelete = (id) => {
    this.setState({refreshing: true}, async () => {
      await this.props._removeReminder(id);
      this._showSnack();
      this.setState({refreshing: false});
    })
  }

  render() {
    return (
      <Fragment>
        <FlatList 
			data={this.props.reminders}
			keyExtractor={(item, i) => `${item.id}`}
			renderItem={this.renderReminders}
			ListEmptyComponent={<NoData {...this.props.navigation}/>}
			refreshing={this.state.refreshing}
			onRefresh={this._onRefresh}
        />
		<Snackbar
			duration={3000}
			visible={this.state.snackVisible}
			onDismiss={this._hideSnack}
			action={{
				label: 'Okay',
				onPress: this._hideSnack,
			}}
		>
			Deleted Succesfully!
		</Snackbar>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '100%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  }
});

// mapStateToProps = ({reminder, firebase:{auth}, firestore}) => ({
//   user: auth,
//   reminders: get(firestore, 'ordered.users.[0].reminders', []),
// });

const getRemindersQuery = () => {
  let uid = _getFirebaseAuthUid();
  return { collection: `users/${uid}/reminders` };
}

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered }}) => {
  let uid = _getFirebaseAuthUid();
  let key = `users/${uid}`;
  return {
    user: auth,
    reminders: get(ordered, key, []),
  }
};

export default compose(
  firestoreConnect(({firebase}) => [
    getRemindersQuery()
  ]),
  connect(mapStateToProps, { _removeReminder })
)(Home);

// export default compose(
//   firestoreConnect(({firebase}) => {
//     let uid = firebase.auth().currentUser ? firebase.auth().currentUser._user.uid : null;
//     return uid ? [
//       `users/${uid}/reminders`
//     ] : [];
//   }),
//   connect(mapStateToProps, { _removeReminder })
//   )(Home);