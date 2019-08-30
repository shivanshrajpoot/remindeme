import * as React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  TouchableHighlight, 
  TouchableOpacity, 
  Slider, 
  Alert,
  Image
} from 'react-native';

import { 
  Snackbar,
  ActivityIndicator, 
  Colors, 
  withTheme, 
  Text, 
  IconButton, 
  Caption, 
  Surface,
  Portal,
  Card,
  Button,
  Title,
  Paragraph,
  Avatar,
  TextInput
} from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
// import ImgToBase64 from 'react-native-image-base64';

import { _addReminder } from '@actions';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'incandescent',
  incandescent: 'auto',
};

class AddNewReminder extends React.Component {

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
		mute: false,
		maxDuration: 5,
		quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    modalVisible: false,
    imageUri: null,
    reminderTitle: null,
    reminderDescription: null,
    isLoading: false,
    showSnack: false
	};

	toggleFacing = () => {
		this.setState({
		  type: this.state.type === 'back' ? 'front' : 'back',
		});
	}

	toggleFlash = () => {
		this.setState({
		  flash: flashModeOrder[this.state.flash],
		});
	}

	toggleWB = () => {
		this.setState({
		  whiteBalance: wbOrder[this.state.whiteBalance],
		});
	}

	toggleFocus = () => {
		this.setState({
		  autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
		});
	}

	zoomOut = () => {
		this.setState({
		  zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
		});
	}

	zoomIn = () => {
		this.setState({
		  zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
		});
	}

	setFocusDepth = (depth) => {
		this.setState({ depth });
	}

	takeVideo = async () => {
		if (this.camera) {
			try {
				const promise = this.camera.recordAsync(this.state.recordOptions);

				if (promise) {
					this.setState({ isRecording: true });
					const data = await promise;
					this.setState({ isRecording: false });
					console.warn('takeVideo', data);
				}
			} catch (e) {
				console.error(e);
			}
		}
	};

  _toggleLoader = () => {
    this.setState(({isLoading}) => ({isLoading: !isLoading}));
  }

	takePicture = async () => {
		if (this.camera) {
      this._toggleLoader();
			const options = { quality: 0.3, base64: true, fixOrientation: true };
			const data = await this.camera.takePictureAsync(options);
      await this._showModal('data:image/jpeg;base64,'+data.base64);
      this._toggleLoader();
		}
	};

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >        
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <IconButton icon={`camera-${this.state.type === 'back' ? 'rear' : 'front'}`} onPress={this.toggleFacing} />
          <IconButton icon={`flash-${this.state.flash}`} onPress={this.toggleFlash} />
          <IconButton icon={`wb-${this.state.whiteBalance}`} onPress={this.toggleWB} />
        </View>
        <Surface
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            elevation:12
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </Surface>
        {this.state.zoom !== 0 && (
          <Caption style={[styles.flipText, styles.zoomText]}>Zoom: {Math.round( this.state.zoom * 10 ) / 10}</Caption>
        )}
        <ActivityIndicator animating={this.state.isLoading}/>
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'column',
            alignSelf: 'flex-end',
          }}
        >
          <IconButton size={30} icon="add" onPress={this.zoomIn}/>
          <IconButton size={30} icon="remove" onPress={this.zoomOut}/>
          <IconButton size={30} icon={`center-focus-${this.state.autoFocus === 'on' ? 'strong' : 'weak'}`} onPress={this.toggleFocus}/>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            disabled={this.state.isLoading}
            icon="add-a-photo" 
            onPress={this.takePicture}/>
        </View>
      </RNCamera>
    );
  }

  renderModal = () => {
    return(
      <Portal>
          <View style={{marginTop: 22}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this._hideModal()
              }}>
              <View style={{ height:'100%', flexDirection: 'column', justifyContent:'center' }}>
                <Card>
                  <Card.Title 
                    title="Add" 
                    subtitle="New Reminder" 
                    left={(props) => 
                      <Avatar.Icon {...props} icon="folder" />} />
                  <Card.Cover source={{ uri: this.state.imageUri }} />
                  <Card.Content style={{ marginVertical: 10 }}>
                    <TextInput
                      label='Title'
                      value={this.state.reminderTitle}
                      onChangeText={reminderTitle => this.setState({ reminderTitle })}
                    />
                    <TextInput
                      type='outlined'
                      style={{marginTop: 10}}
                      numberOfLines={3}
                      label='Description'
                      value={this.state.reminderDescription}
                      onChangeText={reminderDescription => this.setState({ reminderDescription })}
                    />
                  </Card.Content>
                  <Card.Actions style={{ flexDirection: 'row', justifyContent:'space-around', alignItems:'flex-end' }}>
                      <Button onPress={this._hideModal} >Cancel</Button>
                      <Button onPress={this._saveReminder}>Ok</Button>
                  </Card.Actions>
                </Card>
              </View>
            </Modal>
          </View>
        </Portal>
    );
  };

  _showModal = async (imageUri) => this.setState({ modalVisible: true, imageUri });
  
  _hideModal = () => this.setState({ 
    modalVisible: false, 
    imageUri: null,
    reminderTitle: null,
    reminderDescription: null
  });
  
  _saveReminder = async () => {
    this._toggleLoader();
    const { _addReminder } = this.props;
    let reminder = {
      created: new Date(),
      image: this.state.imageUri,
      title: this.state.reminderTitle,
      description: this.state.reminderDescription
    }
    await _addReminder(reminder);
    this._toggleLoader();
    this._hideModal();
    this._showSnack();
  }

  _showSnack = () => this.setState({ snackVisible: true })
  _hideSnack = () => this.setState({ snackVisible: false })

  render() {
  	const { isFocused } = this.props;
    return (
		  <View style={styles.container}>
        { isFocused && this.renderCamera()}
        { this.renderModal() }
        <Snackbar
          duration={3000}
          visible={this.state.snackVisible}
          onDismiss={this._hideSnack}
          action={{
            label: 'Okay',
            onPress: this._hideSnack,
          }}
        >
          Added Succesfully!
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    backgroundColor: 'black',
    color:'white',
    left: 2,
    opacity: 0.5
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
});

export default connect(() => ({}), { _addReminder })(withNavigationFocus(withTheme(AddNewReminder)));

