'use strict';

var React = require('react-native');
import ExNavigator from '@exponent/react-native-navigator';

const Routes = require('./Routes.js');
var CurrentUser = require('./lib/CurrentUser');

var styles = require('./styles.js');

var {
  AppRegistry,
  NavigatorIOS
} = React;


class Eventstagram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    var r = Routes.getFeedRoute;

    if(!CurrentUser.id){
      r = Routes.getLoginRoute;
    }

    return (
      <ExNavigator
        style={styles.navigator}
        navigationBarStyle={{backgroundColor: '#2A5C7E'}}
        titleStyle={{color: '#ffffff'}}
        barButtonTextStyle={{color: '#ffffff'}}
        barButtonIconStyle={{tintColor: '#ffffff'}}
        sceneStyle={{paddingTop: 64}}
        initialRoute={r()} />
    );
  }
}


AppRegistry.registerComponent('Eventstagram', () => Eventstagram);
