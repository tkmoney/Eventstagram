var React = require('react-native');
const Firebase = require('firebase');
const firebaseItemsRef = new Firebase("https://eventstagram.firebaseio.com/items");

var Routes = {
  getFeedRoute(){
    return {
      renderScene(navigator){
        var FeedScreen = require('./App/Components/FeedScreen');
        return (<FeedScreen navigator={navigator} firebaseItemsRef={firebaseItemsRef} />);
      },
      onDidFocus(ev){
        console.log('did focus!', ev);
      },
      getTitle(){
        return 'Photos'
      }
    }
  },
  getCommentsRoute(key){
    return {
      renderScene(navigator){
        var Comments = require('./App/Components/Comments');
        var item = firebaseItemsRef.child(key);
        return (<Comments navigator={navigator} firebaseFeedItem={item} />);
      },
      onDidFocus(ev){
        console.log('did focus!', ev);
      },
      getTitle(){
        return 'Comments'
      }
    }
  },
  getPhotoRoute(){
    console.log('getPhotoRoute!!')
    return {
      renderScene(navigator){
        var TakePhotoScreen = require('./App/Components/TakePhotoScreen');
        return (<TakePhotoScreen navigator={navigator} />);
      },
      onDidFocus(ev){
        console.log('did focus!', ev);
      },
      getTitle(){
        return 'Photo'
      }
    }
  },
  getPhotoReviewRoute(photoURL){
    return {
      renderScene(navigator){
        var PhotoReviewScreen = require('./App/Components/PhotoReviewScreen');
        return (<PhotoReviewScreen navigator={navigator} firebaseItemsRef={firebaseItemsRef} photoURL={photoURL} />);
      },
      onDidFocus(ev){
        console.log('PhotoReviewScreen did focus!', ev);
      },
      getTitle(){
        return 'Review'
      }
    }
  }
};

module.exports = Routes;
