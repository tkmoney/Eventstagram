var React = require('react-native');
var styles = require('../../styles.js');


var {
   View,
   Text,
   TouchableHighlight
} = React;

class FeedItemActions extends React.Component {
   render(){
      return (
        <View style={{flex:1, borderColor:'#c0c0c0', borderBottomWidth: 1}}>
          <TouchableHighlight>
            <Text>Like!</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Comment</Text>
          </TouchableHighlight>
        </View>
      )
   }

}

module.exports = FeedItemActions;