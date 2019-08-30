import React from 'react';
import { View } from 'react-native';
import { Caption, Paragraph, Card, Title, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { _removeReminder } from '@actions';

class Reminder extends React.PureComponent {

  _deleteReminder = () => {
    this.props.onDelete();
  }

  render() {
    console.info('Rendering Reminder.....');
    const { image, title, description, created } = this.props;
    return (
      <Card style={{ margin:4 }}>
        <View style={{ flexDirection: 'column', justifyContent:'space-between' }}>
          <Card.Content style={{ marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
            <Caption style={{ marginTop:'4%' }} >{ new Date(created).toDateString() }</Caption>
            <View style={{ flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end', opacity:1 }}>
              {<IconButton icon="cloud-done" color={'blue'} disabled/>}
              <IconButton icon="delete" onPress={this._deleteReminder}/>
            </View>
          </Card.Content>
        </View>
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <Title>{ title }</Title>
          <Paragraph>
            { description }
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(() => ({}), { _removeReminder })(Reminder);