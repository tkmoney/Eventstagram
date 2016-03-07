var React = require('react-native');
var styles = require('../../styles.js');

var {
  View,
  Text,
} = React;

class Comment extends React.Component {
  render(){
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.username}</Text>
        <Text>{this.props.comment}</Text>
      </View>
    )
  }

}

module.exports = Comment;