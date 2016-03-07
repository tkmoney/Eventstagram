var React = require('react-native');
var styles = require('../../styles.js');
var Comment = require('./Comment');


var {
  View,
  Text,
} = React;

class Comments extends React.Component {
  render(){
    var comments = this.props.comments ? this.props.comments.map((itm, i) => {
      return <Comment key={i} username={itm.username} comment={itm.comment} />
    }) : <Text></Text>;

    return (
      <View style={{flex: 1}}>
        {comments}
      </View>
    )
}

}

module.exports = Comments;