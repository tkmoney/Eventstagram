var React = require('react-native');
var styles = require('../../styles.js');
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
  }

  renderComments(){
    var interation_num = 0;
    var elm_arr = [];
    _.forEachRight(this.props.comments, (c, k) => {
      if(interation_num >= this.truncateSize){return};
      elm_arr.push(<Comment key={k} username={c.username} comment={c.comment} timestamp={c.timestamp} />);
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