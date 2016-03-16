var React = require('react-native');
var styles = require('../../styles.js');
var Util = require('../../lib/util.js');


var {
  View,
  Text,
  Image
} = React;

class Comment extends React.Component {
  render(){
    return (
      <View style={{flex: 1, flexDirection:'row', marginLeft: 5, marginTop: 5, marginRight: 5}}>
        <View style={{flex:1, flexDirection:'row', backgroundColor: 'blue'}}>
          <Image style={{flex: 1, backgroundColor:'orange', width: 15, height: 15}} />
        </View>
        <View style={{flex:7, marginLeft: 5, paddingBottom: 5, borderBottomWidth:1, borderBottomColor:'#c0c0c0'}}>
          <View style={{flex: 1,flexDirection:'row'}}>
            <Text style={{flex:1}}>{this.props.username}</Text>
            <Text style={{flex:0, color:'#c0c0c0'}}>{Util.timeSince(new Date(parseInt(this.props.timestamp)))}</Text>
          </View>
          <Text>{this.props.comment}</Text>
        </View>
      </View>
    )
  }

}

module.exports = Comment;