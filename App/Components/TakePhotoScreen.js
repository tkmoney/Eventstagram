var React = require('react-native');
import Camera from 'react-native-camera';
var styles = require('../../styles.js');


var {
   View,
   Text,
   TouchableHighlight
 } = React;

class TakePhotoScreen extends React.Component {

    takePicture() {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }

    render(){
      return (
        <View style={{flex:1}}>
          <Camera ref={(cam) => {this.camera = cam}} aspect={Camera.constants.Aspect.fill} style={{flex:1}} />
          <View style={{flex:0.2, backgroundColor:'#333333',justifyContent:'center', flexDirection:'row'}}>
            <TouchableHighlight onPress={this.takePicture.bind(this)} style={{width:80, flex: 1, alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
              <View style={{width:75,height:75,backgroundColor:'navy',borderRadius:75}}></View>
            </TouchableHighlight>
          </View>
        </View>
      )
    }

}

module.exports = TakePhotoScreen;