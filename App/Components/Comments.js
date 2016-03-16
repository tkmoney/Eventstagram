var React = require('react-native');
var styles = require('../../styles.js');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var Routes = require('../../Routes');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Comment = require('./Comment');


var {
  View,
  Text,
  ScrollView,
  ListView,
  TextInput,
  TouchableHighlight,
  DeviceEventEmitter,
  LayoutAnimation
} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.firebaseFeedItem = this.props.firebaseFeedItem;
    this.firebaseComments = this.firebaseFeedItem.child('comments');
    this.state = {
      commentInputText: "",
      textInputIsFocused: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      visibleHeight: windowSize.height
    }
  }

  onFirebaseValueChange(snap){
    var items = [];
    snap.forEach((child) => {
      items.push({
        username: child.val().username,
        comment: child.val().comment,
        timestamp: child.val().timestamp,
        _key: child.key()
      });
    });
    items = items.reverse();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
  }

  componentWillMount(){
    this.willShowEvent = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.willHideEvent = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow(e){
    let newSize = (Dimensions.get('window').height - e.endCoordinates.height);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({visibleHeight: newSize});
  }

  keyboardWillHide(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({visibleHeight: Dimensions.get('window').height});
  }

  componentDidMount(){
    this.firebaseComments.on('value', this.onFirebaseValueChange.bind(this));
  }

  componentWillUnmount(){
    this.willShowEvent.remove();
    this.willHideEvent.remove();
    this.firebaseComments.off();
    this.firebaseFeedItem = null;
    this.firebaseComments = null;
  }

  renderComment(cmt){
    return (<Comment username={cmt.username} comment={cmt.comment} timestamp={cmt.timestamp} />);
  }

  onCommentSendPress(){
    if(this.state.commentInputText === ""){return};
    var new_item = this.firebaseComments.push();
    new_item.setWithPriority({
      username: "TEST AUTHOR",
      timestamp: Firebase.ServerValue.TIMESTAMP,
      comment: this.state.commentInputText
    }, Firebase.ServerValue.TIMESTAMP, () => {
      this.state.commentInputText = "";
      this.refs.commentTextInput.blur();
      //this.setState({modalVisible: false, modalIsAnimated: false});
    });
  }

  onInputChange(ev){
    this.setState({commentInputText: ev.nativeEvent.text});
  }


  render(){
    var inputStyle = {height: 50, flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: '#ffffff', margin: 5, padding: 5, borderColor:'#333', borderWidth: 1, borderRadius: 3}

    var sendButtonInputStyle = {flex: 1, backgroundColor:'#2A5C7E', alignItems: 'center', borderRadius: 5, margin: 5};

    if(this.state.commentInputText === ""){
      sendButtonInputStyle.opacity = 0.5;
    }

    return (
      <View style={{height: (this.state.visibleHeight - 64)}}>
        <ListView ref="listview" dataSource={this.state.dataSource} renderRow={this.renderComment.bind(this)} style={{flex:5}} />
        <View style={{height: 45, backgroundColor: '#c0c0c0'}}>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:3, justifyContent:'center'}}>
              <TextInput multiline={false} textAlignVertical="top" value={this.state.commentInputText} onChange={this.onInputChange.bind(this)} placeholder="add a comment..." ref="commentTextInput" style={inputStyle} />
            </View>
            <TouchableHighlight onPress={this.onCommentSendPress.bind(this)} style={sendButtonInputStyle}>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color:'#ffffff'}}>SEND</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

}

module.exports = Comments;