'use strict';

var React = require('react-native');
const Firebase = require('firebase');
var styles = require('../../styles.js');
import { Mixin } from 'Subscribable';
var PhotoButtonBar = require('./PhotoButtonBar');
var FeedItem = require('./FeedItem');


var {
   View,
   Text,
   ListView,
   AlertIOS
} = React;

@Mixin
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

  onFirebaseValueChange(snap){
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
  }

  listenForItems(itemsRef) {
    itemsRef.orderByPriority().on('value', this.onFirebaseValueChange.bind(this));
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    console.log('this.refs.listview', this.refs.listview);
    console.log('this.props.navigator: ', this.props.navigator);
    //this.addListenerOn(this.props.navigator.navigationContext,'didfocus',(e)=>{console.log(e, 'navigationContext')});
    this.refs.listview.scrollTo({y: 0});
  }

  componentWillUnmount(){
    console.log("componentWillUnmount")
    this.itemsRef.off('value', this.onFirebaseValueChange);
  }


  onPhotoButtonClick(){
    //AlertIOS.alert('add new item', null, [{text:'Add', onPress: this.onAlertAddItemPress.bind(this)}],'plain-text');
    this.props.navigator.push(this.props.routes.takePhoto);
  }


   render(){
      return (
         <View style={styles.navigatorChildScreen}>
            <ListView ref="listview" dataSource={this.state.dataSource} renderRow={(itm)=>{return (<FeedItem item={itm} />)}} style={{flex:1}} />
            <PhotoButtonBar onPhotoButtonClick={this.onPhotoButtonClick.bind(this)} />
         </View>
      )
   }

}

module.exports = FeedScreen;