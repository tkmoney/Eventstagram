var React = require('react-native');
var styles = require('../../styles.js');

var {
   View,
   Text,
   TouchableHighlight
} = React;

class PhotoButtonBar extends React.Component {

   render(){
      return (
            <View style={styles.photoButtonBar}>
               <View style={{flex:1, justifyContent:'center',flexDirection:'row'}}>
                  <TouchableHighlight onPress={this.props.onPhotoButtonClick} style={{backgroundColor:'orange',width:60}}>
                     <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:38,textAlign:'center'}}>📷</Text>
                     </View>
                  </TouchableHighlight>
               </View>
            </View>
      )
   }

}

module.exports = PhotoButtonBar;