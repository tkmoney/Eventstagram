var React = require('react-native');
var FBLogin = require('react-native-facebook-login');
var styles = require('../../styles.js');

var {
   View,
   Text,
} = React;

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

   render(){
    return (
      <View style={{flex: 1}}>
        <FBLogin onLogin={(data) => {console.log('login data: ', data)}} onLogout={()=>{console.log('logged out')}} />
      </View>
    )
   }

}

module.exports = LoginScreen;