var React = require('react-native');
var FBLogin = require('react-native-facebook-login');
var image_uploader = require('../../lib/image_uploader.js');
const Routes = require('../../Routes.js');
const Globals = require('../../lib/Globals');
var CurrentUser = require('../../lib/CurrentUser');
var FirebaseService = require('../../lib/firebase_service.js');
var styles = require('../../styles.js');

var {
   View,
   Text,
   ActivityIndicatorIOS
} = React;

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = {
      showLoading: false
    }

  }

  componentWillMount(){
  }


  onLogin(data){
    this.setState({showLoading:true});
    var userid = data.credentials.userId;
    var name = "";
    var url = `https://graph.facebook.com/me/?fields=picture,name&access_token=${data.credentials.token}`;
    fetch(url).then((response) => response.json()).then((data) => {
      name = data.name;
      var p = encodeURIComponent(data.picture.data.url);
      return fetch(`https://api.cloudinary.com/v1_1/${Globals.CLOUDINARY_SIG}/image/upload?file=${p}&upload_preset=${Globals.CLOUDINARY_PRESET}`);
    }).then((uploadResponse) => {
      let json = JSON.parse(uploadResponse._bodyText);
      return FirebaseService.addUser({name: name, id: userid, picture: json.url});
    }).then((snap) => {
      console.log('USER ADDED/UPDATED!', snap);
      CurrentUser.name = snap.val().name;
      CurrentUser.id = snap.key();
      CurrentUser.picture = snap.val().picture;
      console.log('CurrentUser', CurrentUser);
      this.setState({showLoading:false});
      this.props.navigator.replace(Routes.getFeedRoute());
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