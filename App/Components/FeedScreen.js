'use strict';

var React = require('react-native');
const Firebase = require('firebase');
var styles = require('../../styles.js');
var Routes = require('../../Routes');

var PhotoButtonBar = require('./PhotoButtonBar');
var FeedItem = require('./FeedItem');

var {
   View,
   Text,
   ListView
} = React;

class FeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = this.props.firebaseItemsRef;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          var keydiff = (row1._key !== row2._key);
          var cmtdiff = (row1.comments !== row2.comments);
          var likesdiff = (row1.likes !== row2.likes);
          return (keydiff || cmtdiff || likesdiff);
        },
      })
    }
  }

  onFirebaseValueChange(snap){
    // get children as an array
    console.log('onFirebaseValueChange!', snap);
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
    this.refs.listview.scrollTo({y: 0});
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
    this.itemsRef.off();
  }


  onPhotoButtonClick(){
    console.log('onPhotoButtonClick!', Routes);
    this.props.navigator.push(Routes.getPhotoRoute());
  }

  renderItem(itm){
    return (<FeedItem item={itm} {...this.props} />);
  }

   render(){
      return (
         <View style={styles.navigatorChildScreen}>
            <ListView ref="listview" dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={{flex:1}} />
            <PhotoButtonBar onPhotoButtonClick={this.onPhotoButtonClick.bind(this)} />
         </View>
      )
   }

}

module.exports = FeedScreen;