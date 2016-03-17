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
    this.itemsRef = this.props.firebasePhotosRef;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          return (row1 !== row2);
        },
      })
    }
  }

  onFirebaseValueChange(snap){
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
    itemsRef.orderByChild("timestamp").on('value', this.onFirebaseValueChange.bind(this));
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.refs.listview.scrollTo({y: 0});
  }

  componentWillUnmount(){
    this.itemsRef.off();
  }


  onPhotoButtonClick(){
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