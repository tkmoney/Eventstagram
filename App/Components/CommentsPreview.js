var React = require('react-native');
var styles = require('../../styles.js');
const FirebaseService = require('../../lib/firebase_service.js');
var Routes = require('../../Routes.js');
var Comment = require('./Comment');
var _ = require('lodash');
var Util = require('../../lib/util.js');


var {
  View,
  Text,
  TouchableHighlight
} = React;

class CommentsPreview extends React.Component {

  constructor(props){
    super(props);
    this.truncateSize = (!this.props.truncateSize) ? 2 : this.props.truncateSize;
    this.state = {
      comments: []
    }
  }


  componentWillMount(){
    this.usersRef = FirebaseService.usersRef;
    this.commentsRef = FirebaseService.commentsRef.child(this.props.commentsRecordId);
    this.commentsRef.on('value', this.onCommentsChange.bind(this));
  }

  componentWillUnmount(){
    this.commentsRef.off();
  }

  onCommentsChange(snap){
    var cmts = []
    snap.forEach((child) => {
      cmts.push({
        _key: child.key(),
        comment: child.val().comment,
        user_id: child.val().user_id,
        timestamp: child.val().timestamp
      });
    });
    this.state.comments = cmts;
  }


  renderComments(){
    var interation_num = 0;
    var elm_arr = [];
    _.forEachRight(this.state.comments, (c, k) => {
      if(interation_num >= this.truncateSize){return};
      elm_arr.push(<Comment key={k} user_id={c.user_id} comment={c.comment} timestamp={c.timestamp} />);
      interation_num++;
    });
    interation_num = 0;
    return elm_arr;
  }

  postCommentsText(){
    var txt = null;
    if(typeof(this.props.comments) !== 'undefined'){
      var num_comments = Object.keys(this.props.comments).length;
      if(num_comments > this.truncateSize){
        txt = (<Text>{num_comments - this.truncateSize} more comments...</Text>);
      }
    }
    return txt;
  }

  onCommentsPress(){
    this.props.navigator.push(Routes.getCommentsRoute(this.props.item._key));
  }

  render(){
    var cmts = (!this.props.comments) ? <Text>no comments</Text> : this.renderComments();
    var postCommentsText = this.postCommentsText();
    return (
      <TouchableHighlight style={{flex: 1}} onPress={this.onCommentsPress.bind(this)}>
        <View>
          {cmts}
          {postCommentsText}
        </View>
      </TouchableHighlight>
    )
  }

}

module.exports = CommentsPreview;