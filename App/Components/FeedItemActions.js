var React = require('react-native');
var styles = require('../../styles.js');
var Routes = require('../../Routes.js');


var {
   View,
   Text,
   TouchableHighlight
} = React;

class FeedItemActions extends React.Component {

  constructor(props){
    super(props);
  }

  onCommentPress(){
    this.props.navigator.push(Routes.getCommentsRoute(this.props.item._key));
  }

  render(){
    return (
      <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', borderColor:'#c0c0c0', borderBottomWidth: 1}}>
        <TouchableHighlight>
          <Text>Like!</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onCommentPress.bind(this)}>
          <Text>Comment</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

module.exports = FeedItemActions;