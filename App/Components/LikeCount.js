var React = require('react-native');
var styles = require('../../styles.js');

var {
   View,
   Text,
} = React;

class LikeCount extends React.Component {


   render(){
      var likes = ((!this.props.likes) ? 0 : this.props.likes.length);

      return (
        <View style={{flex: 1}}>
          <Text>{likes} {(likes > 1) ? "likes" : "like"}</Text>
        </View>
      )
   }

}

module.exports = LikeCount;