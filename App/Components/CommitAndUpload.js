var React = require('react-native');
const Firebase = require('firebase');
var image_uploader = require('../../lib/image_uploader.js');
var styles = require('../../styles.js');


var {
   View,
   Text,
   DeviceEventEmitter
 } = React;


class CommitAndUploadScreen extends React.Component {

    constructor(props) {
      super(props);
      this.itemsRef = new Firebase("https://eventstagram.firebaseio.com/items");
      this.state = {
        isUploading: false,
        uploadPercentage: 0
      }
    }


    componentDidMount(){
        // upload progress
        DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
          let bytesWritten = data.totalBytesWritten;
          let bytesTotal   = data.totalBytesExpectedToWrite;
          let progress     = data.progress;
          this.setState({uploadPercentage: progress});
          console.log( "upload progress: " + progress + "%");
        });

        if(this.props.photoData){
          image_uploader(this.props.photoData, this.onUploadComplete);
        }
    }

    onUploadComplete(err, response){
        if( err ){
            console.log(err);
            return;
        }

        let status = response.status;
        let responseString = response.data;
        let json = JSON.parse( responseString );

        console.log('upload complete with status ' + status);
    }
    

    render(){
      return (
        <View style={{flex:1}}>
          <Text>{this.state.uploadPercentage}% uploaded...</Text>
        </View>
      )
    }

}

module.exports = CommitAndUploadScreen;