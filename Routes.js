var React = require('react-native');
const Globals = require('./lib/Globals');
const Firebase = require('firebase');
const firebasePhotosRef = new Firebase(`${Globals.FIREBASE_ROOT}/items`);

var Routes = {
  getLoginRoute(){
    return {
      renderScene(navigator){
        var LoginScreen = require('./App/Components/LoginScreen.js');
        return (<LoginScreen navigator={navigator} />);
      },
      onDidFocus(ev){
      },
      getTitle(){
        return 'Login'
      }
    }
  },
  getFeedRoute(){
    return {
      renderScene(navigator){
        var FeedScreen = require('./App/Components/FeedScreen');
        return (<FeedScreen navigator={navigator} firebasePhotosRef={firebasePhotosRef} />);
      },
      onDidFocus(ev){
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
        var item = firebasePhotosRef.child(key);
        return (<Comments navigator={navigator} firebaseFeedItem={item} />);
      },
      onDidFocus(ev){
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
        return (<PhotoReviewScreen navigator={navigator} firebasePhotosRef={firebasePhotosRef} photoURL={photoURL} />);
      },
      onDidFocus(ev){
      },
      getTitle(){
        return 'Review'
      }
    }
  }
};

module.exports = Routes;
