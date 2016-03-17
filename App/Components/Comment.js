var React = require('react-native');
const FirebaseService = require('../../lib/firebase_service.js');
var styles = require('../../styles.js');
var Util = require('../../lib/util.js');


var {
  View,
  Text,
  Image
} = React;

class Comment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "loading..",
      picture: ""
    }
  }

  componentWillMount(){
    this.usersRef = FirebaseService.usersRef;
    this.usersRef.child(this.props.user_id).once('value').then((snap) => {
      this.setState({
        name: snap.val().name,
        picture: snap.val().picture
      });
    });
  }

  componentWillUnmount(){
    this.usersRef.off();
  }

  render(){
    return (
      <View style={{flex: 1, flexDirection:'row', marginLeft: 5, marginTop: 5, marginRight: 5}}>
        <View style={{flex:1, flexDirection:'row', backgroundColor: 'blue'}}>
          <Image source={{uri: this.state.picture}} style={{flex: 1, backgroundColor:'orange', width: 15, height: 15}} />
        </View>
        <View style={{flex:7, marginLeft: 5, paddingBottom: 5, borderBottomWidth:1, borderBottomColor:'#c0c0c0'}}>
          <View style={{flex: 1,flexDirection:'row'}}>
            <Text style={{flex:1}}>{this.state.name}</Text>
            <Text style={{flex:0, color:'#c0c0c0'}}>{Util.timeSince(new Date(parseInt(this.props.timestamp)))}</Text>
          </View>
          <Text>{this.props.comment}</Text>
        </View>
      </View>
    )
  }

}

module.exports = Comment;