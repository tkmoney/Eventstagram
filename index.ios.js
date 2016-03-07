/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

const Routes = require('./Routes');
var styles = require('./styles.js');

console.log('after require index', Routes, styles);


var {
  AppRegistry,
  NavigatorIOS
} = React;



class Eventstagram extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('ROUTES', Routes);
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={Routes.main} />
      
    );
  }
}


AppRegistry.registerComponent('Eventstagram', () => Eventstagram);
