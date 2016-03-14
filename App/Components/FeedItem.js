var React = require('react-native');
var styles = require('../../styles.js');
var Util = require('../../lib/util.js');
var FeedItemActions = require('./FeedItemActions');
var LikeCount = require('./LikeCount');
var Comments = require('./Comments');

var {
   View,
   Text,
   Image
} = React;

class FeedItem extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        displayTime: "0s"
      }
      //this.updateDisplayInterval();
      this.interval = null;
    }

    timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + "y";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + "d";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + "h";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + "m";
        }
        return Math.floor(seconds) + "s";
    }

    updateDisplayInterval(){
      var displaytime = Util.timeSince(new Date(parseInt(this.props.item.timestamp)));
      this.setState({displayTime: displaytime});
    }

    componentWillMount(){
    }

    componentDidMount(){
      this.interval = setInterval(this.updateDisplayInterval.bind(this), 30000);
      this.updateDisplayInterval();
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }

    render(){
      /*
            <Comments comments={this.props.item.comments} />
      */

      return (
        <View style={{flex:1}}>
          <View style={{flex:1, padding: 5, flexDirection: 'row', alignItems:'stretch'}}>
            <View style={{flex:1}}>
              <Text>{this.props.item.author}</Text>
            </View>
            <View style={{flex:1, alignItems: 'flex-end'}}>
              <Text>{this.state.displayTime} ago</Text>
            </View>
          </View>
          <Image style={{flex: 1, resizeMode: 'contain', height: 400, backgroundColor:'#000'}} source={{uri: this.props.item.image}} />
          <View style={{paddingLeft:10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
            <FeedItemActions {...this.props} />
            <LikeCount likes={this.props.item.likes} />
          </View>
        </View>
      )
    }

}

module.exports = FeedItem;