'use strict';

var React = require('react-native');

const Firebase = require('firebase');

var styles = require('../../styles.js');

var PhotoButtonBar = require('./PhotoButtonBar');
var FeedItem = require('./FeedItem');


var {
   View,
   Text,
   ListView,
   AlertIOS
} = React;


class FeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = new Firebase("https://eventstagram.firebaseio.com/items");
    this.state = {
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1._key !== row2._key,
      })
    }
  }

  listenForItems(itemsRef) {
    itemsRef.orderByPriority().on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          image: child.val().image,
          author: child.val().author,
          timestamp: child.val().timestamp,
          likes: child.val().likes,
          comments: child.val().comments,
          _key: child.key()
        });
      });
      items = items.reverse();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }


  onAlertAddItemPress(text){

    var new_item = this.itemsRef.push();
    new_item.setWithPriority({
      image: "https://unsplash.it/200/300/?random&cachebust=#".replace('#', Math.random()),
      author: text,
      timestamp: Firebase.ServerValue.TIMESTAMP,
      comments: [],
      likes: []
    }, Firebase.ServerValue.TIMESTAMP);

  }

  onPhotoButtonClick(){
    //AlertIOS.alert('add new item', null, [{text:'Add', onPress: this.onAlertAddItemPress.bind(this)}],'plain-text');
    this.props.navigator.push(this.props.routes.takePhoto);
  }

   _renderItem(item){
      console.log('_renderItem item is:', item);
      return (<FeedItem item={item} />);
   }


   render(){
      return (
         <View style={styles.navigatorChildScreen}>
            <ListView dataSource={this.state.dataSource} renderRow={(itm)=>{console.log("renderRow itm is", itm);return (<FeedItem item={itm} />)}} style={{flex:1}} />
            <PhotoButtonBar onPhotoButtonClick={this.onPhotoButtonClick.bind(this)} />
         </View>
      )
   }

}

module.exports = FeedScreen;