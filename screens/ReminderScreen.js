import React, { Fragment } from 'react';
import { View, Image, ScrollView, StyleSheet, Button, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createTask } from '../redux/actions/taskActions';

import { connect } from 'react-redux';


class ReminderScreen extends React.Component {
  static navigationOptions = {
    title: 'Reminder',
  };

  constructor(props){
    super(props);
    this.state = {
      image: {},
      text: 'Description',
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);
    console.log()
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  async setDateAndroid(newDate) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  async setTimeAndroid(newDate) {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  componentDidMount(){
    let photo = this.props.navigation.getParam('photo', {});
    this.setState({image: photo});
  }

  createNewReminder(){

  }



  render() {

    return (
      <View style={styles.container}>
         <View style={{ flex: 2.5, justifyContent: 'center' }}>
          <Image
            resizeMode="contain"
            style={styles.canvas}
            source={{uri: this.state.image.uri}}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Input
            label="What's this?"
            inputContainerStyle={styles.textInput}
            containerStyle={styles.inputContainer}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          {
            Platform.OS === 'ios' && <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={this.setDate}
            />
          }
          {
            Platform.OS === 'android' && <Fragment><Button
              title='Set Date'
              onPress={this.setDateAndroid}
            />
            <Button
              title='Set Time'
              onPress={this.setTimeAndroid}
            /></Fragment>
          }
          <Button
            title='Create'
            onPress={this.createNewReminder}
          />
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textInput: {
    padding: 5,
    margin: 20,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  button: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  }
});

const mapDispatchToProps = { createTask };

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReminderScreen);