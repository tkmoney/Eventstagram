var React = require('react-native');
var styles = require('../../styles.js');
var FeedItemActions = require('./FeedItemActions');
var LikeCount = require('./LikeCount');
var Comments = require('./Comments');

/*
item schema
{
"9812398h123":{
    "image":"http://i.imgur.com/8Ap38Dj.jpg",
    "author":"Robert",
    "timestamp":"1457247744787",
    "comments":[{"username":"Mike","comment":"cool pic"}],
    "likes":["Frank"]
}
}
*/

var {
   View,
   Text,
   Image
} = React;

class FeedItem extends React.Component {

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


    render(){
      console.log('render feed item', this.props.item);
      return (
        <View style={{flex:1}}>
          <View style={{flex:1, padding: 5, flexDirection: 'row', alignItems:'stretch'}}>
            <View style={{flex:1}}>
              <Text>{this.props.item.author}</Text>
            </View>
            <View style={{flex:1, alignItems: 'flex-end'}}>
              <Text>{this.timeSince(new Date(parseInt(this.props.item.timestamp)))} ago</Text>
            </View>
          </View>
          <Image style={{flex: 1, resizeMode: 'contain', height: 400, backgroundColor:'#000'}} source={{uri: this.props.item.image}} />
          <View style={{paddingLeft:10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
            <FeedItemActions />
            <LikeCount likes={this.props.item.likes} />
            <Comments comments={this.props.item.comments} />
          </View>
        </View>
      )
    }

}

module.exports = FeedItem;