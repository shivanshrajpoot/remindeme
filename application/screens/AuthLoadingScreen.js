import * as React from 'react';
import { ActivityIndicator, Colors, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

class AuthLoadingScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	async componentDidMount(){
		const { navigation: { navigate }, user } = this.props;
		console.log('AuthLoadingScreen', user)
		let navigateTo = user ? 'Auth' : 'App';
		await navigate(navigateTo);
	}

	render() {
		return (
			<View style={styles.container}>
		  		<ActivityIndicator animating={true} color={Colors.red800} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

mapStateToProps = ({firebase}) => ({
	user: firebase.auth
})
export default connect(mapStateToProps, {})(withTheme(AuthLoadingScreen));