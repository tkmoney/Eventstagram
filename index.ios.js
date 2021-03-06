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
    return (
      <ExNavigator
        style={styles.navigator}
        navigationBarStyle={{backgroundColor: '#2A5C7E'}}
        titleStyle={{color: '#ffffff'}}
        barButtonTextStyle={{color: '#ffffff'}}
        barButtonIconStyle={{tintColor: '#ffffff'}}
        sceneStyle={{paddingTop: 64}}
        initialRoute={Routes.getLoginRoute()} />
    );
  }
}


AppRegistry.registerComponent('Eventstagram', () => Eventstagram);
