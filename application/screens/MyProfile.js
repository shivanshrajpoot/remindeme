import * as React from 'react';
import { Portal, Dialog, Paragraph, ActivityIndicator, Colors, withTheme, Button, Avatar, Subheading } from 'react-native-paper';
import { connect } from 'react-redux';
import { Alert, View, StyleSheet } from 'react-native';

import { logoutUser } from '@actions';

class MyProfile extends React.PureComponent {
	state = {
		dialogVisible: false
	}
	_logOut = async () => {
		this._hideDialog();
		const { logoutUser } = this.props;
		await logoutUser();
	}

	_showDialog = () => this.setState({ dialogVisible: true })

  	_hideDialog = () => this.setState({ dialogVisible: false })

	render() {
		const { user } = this.props;
		return (
			<View style={styles.container}>
				<View style={{ justifyContent: 'space-between', alignItems:'center' }}>
					{user.photoURL && <Avatar.Image size={150} source={{ uri: user.photoURL }} />}
					{user.displayName &&  <Subheading>{ user.displayName }</Subheading> }
					{user.email && <Subheading>{ user.email }</Subheading> }
				</View>
				<Button mode="contained" onPress={this._showDialog}>
				    Log Out
				</Button>
				<Portal>
		          <Dialog
		             visible={this.state.dialogVisible}
		             onDismiss={this._hideDialog}>
		            <Dialog.Title>Are you sure ?</Dialog.Title>
		            <Dialog.Content>
		              <Paragraph> Do you want to logout ?</Paragraph>
		            </Dialog.Content>
		            <Dialog.Actions style={{ justifyContent: 'space-around' }}>
		              <Button onPress={this._logOut}>Yes</Button>
		              <Button onPress={this._hideDialog}>No</Button>
		            </Dialog.Actions>
		          </Dialog>
		        </Portal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

mapStateToProps = ({firebase:{auth}}) => ({
	user: auth
});

export default connect(mapStateToProps, { logoutUser })(withTheme(MyProfile));