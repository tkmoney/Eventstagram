var React = require('react-native');
var FBLogin = require('react-native-facebook-login');
var image_uploader = require('../../lib/image_uploader.js');
const Routes = require('../../Routes.js');
const Globals = require('../../lib/Globals');
var LocalUserData = require('../../lib/LocalUserData');
var CurrentUser = require('../../lib/CurrentUser');
var FirebaseService = require('../../lib/firebase_service.js');
var styles = require('../../styles.js');

var {
   View,
   Text,
   ActivityIndicatorIOS,
   AsyncStorage
} = React;

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: true
    }
  }

  componentDidMount(){
    LocalUserData.loadProfileFromStorage().done(() => {
      if(!CurrentUser.id){
        this.state.showLoading = false;
        this.forceUpdate();
      }else{
        this.navigateToFeedScreen();
      }
    });
  }

  navigateToFeedScreen(){
    let r = Routes.getFeedRoute();
    this.props.navigator.replace(r);
  }

  onLogin(data){
    this.setState({showLoading:true});
    var userid = data.credentials.userId;
    var name = "";
    var url = `https://graph.facebook.com/me/?fields=picture,name&access_token=${data.credentials.token}`;
    fetch(url).then((response) => response.json()).then((data) => {
      name = data.name;
      var p = encodeURIComponent(data.picture.data.url);
      return fetch(`https://api.cloudinary.com/v1_1/${Globals.CLOUDINARY_SIG}/image/upload?file=${p}&upload_preset=${Globals.CLOUDINARY_PRESET}`)
        .then((response)=>{return response.json()});
    }).then((uploadResponse) => {
      return FirebaseService.addUser({name: name, id: userid, picture: uploadResponse.url});
    }).then((snap) => {
      console.log('USER ADDED/UPDATED!', snap);
      var userData = {
        name: snap.val().name,
        id: snap.key(),
        picture: snap.val().picture
      };
      return LocalUserData.storeUserData(userData).done(()=>{
        this.navigateToFeedScreen();
      })
    }).catch((e)=>{
      console.error('error on auth: ', e);
      this.setState({showLoading: false});
    });
  }


   render(){
    var ui = this.state.showLoading ? <ActivityIndicatorIOS /> : <FBLogin onLogin={this.onLogin.bind(this)} onLogout={()=>{console.log('logged out')}} />

    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        {ui}
      </View>
    )
   }

}

module.exports = LoginScreen;