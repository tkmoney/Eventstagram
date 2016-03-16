var React = require('react-native');
const Firebase = require('firebase');
var image_uploader = require('../../lib/image_uploader.js');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var styles = require('../../styles.js');
var {
   View,
   Modal,
   Text,
   Image,
   TextInput,
   TouchableHighlight,
   ScrollView,
   ProgressViewIOS,
   DeviceEventEmitter
 } = React;

class PhotoReviewScreen extends React.Component {

    constructor(props){
      super(props);
      this.itemsRef = this.props.firebasePhotosRef;

      this.state = {
        modalVisible: false,
        modalIsAnimated: true,
        uploadPercentage: 0
      }
    }

    onRNUploaderProgress(data){
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState({uploadPercentage: progress});
      console.log( "upload progress: " + progress + "%");
    }

    componentDidMount(){
        // upload progress
        this.deviceProgressEvent = DeviceEventEmitter.addListener('RNUploaderProgress', this.onRNUploaderProgress.bind(this));
    }

    componentWillUnmount(){
      this.deviceProgressEvent.remove();
    }

    onTextInputFocus(e){
      this.inputFocused('captionTextInput');
    }

    onTextInputBlur(e){
      setTimeout(()=>{
        this.refs.scrollView.scrollTo({x:0,y: -64, animated:true});
      },100);
    }

    inputFocused (refName) {
      setTimeout(() => {
        let scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          React.findNodeHandle(this.refs[refName]),
          0, //additionalOffset
          true
        );
      }, 100);
    }

    onSharePress(){
      this.setState({modalVisible: true});
      image_uploader(this.props.photoURL, this.onUploadComplete.bind(this));
    }

    onUploadComplete(err, response){
        if( err ){
            console.log(err);
            this.setState({modalVisible: false});
            return;
        }

        let status = response.status;
        let responseString = response.data;
        let json = JSON.parse( responseString );

        console.log(json);
        
        var new_item = this.itemsRef.push();
        new_item.setWithPriority({
          image: "http://res.cloudinary.com/dnhb1uskb/image/upload/c_limit,h_400,q_jpegmini:1,w_320/#.^".replace('#', json.public_id).replace('^',json.format),
          author: "TEST AUTHOR",
          timestamp: Firebase.ServerValue.TIMESTAMP,
          comments: [],
          likes: []
        }, Firebase.ServerValue.TIMESTAMP, () => {
          this.setState({modalVisible: false, modalIsAnimated: false});
          this.props.navigator.popToTop();
        });

    }

    render(){
      return (
        <ScrollView ref="scrollView">
          <View style={{height: (windowSize.height - 65)}}>
            <View style={{flex: 3, padding: 10}}>
              <Image style={{resizeMode: 'contain', flex: 1}} source={{uri: this.props.photoURL}} />
            </View>
            <View style={{flex: 1}}>
              <View style={{flex:1.5, padding: 10}}>
                <TextInput multiline={true} placeholder="enter a caption (optional)" ref="captionTextInput" onBlur={this.onTextInputBlur.bind(this)} onFocus={this.onTextInputFocus.bind(this)} style={{flex: 1, marginBottom: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, borderColor:'#333', borderWidth:1, borderRadius:3}} />
              </View>
              <TouchableHighlight onPress={this.onSharePress.bind(this)} style={{flex: 1, backgroundColor:'#2A5C7E', alignItems: 'center'}}>
                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                  <Text style={{color:'#ffffff'}}>SHARE</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <Modal animated={this.state.modalIsAnimated} visible={this.state.modalVisible}>
            <View style={{flex: 1, alignItems: "center", justifyContent:"center", backgroundColor:"#333"}}>
              <View style={{flex:1, flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
                <Text style={{color: '#fff', margin: 10}}>uploading</Text>
                <ProgressViewIOS style={{width: 150}} progress={(this.state.uploadPercentage) * 0.01} />
                <Text style={{color: '#fff', margin: 10}}>{Math.floor(this.state.uploadPercentage)}%</Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )
    }

}

module.exports = PhotoReviewScreen;