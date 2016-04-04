var React = require('react-native');
const FirebaseService = require('./lib/firebase_service.js');
const LocalUserData = require('./lib/LocalUserData.js');

const firebasePhotosRef = FirebaseService.photosRef;

var {
   View,
   Text,
   TouchableHighlight
} = React;

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
      },
      renderRightButton(navigator){
        let onpress = () => {
          LocalUserData.showLogoutActionSheet().then(() => {
            navigator.replace(Routes.getLoginRoute());
          }).catch((err)=>{console.log(err)});
        }
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <TouchableHighlight onPress={onpress}>
              <Text style={{color:'#fff', fontSize: 13}}>LOGOUT</Text>
            </TouchableHighlight>
          </View>
        );
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
