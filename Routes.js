var FeedScreen = require('./App/Components/FeedScreen');
var TakePhotoScreen = require('./App/Components/TakePhotoScreen');
var PhotoReviewScreen = require('./App/Components/PhotoReviewScreen');
var CommitAndUploadScreen = require('./App/Components/CommitAndUpload');

var Routes = {
  main: {
    title: 'Photo Feed',
    barTintColor:'#2A5C7E',
    titleTextColor:'#ffffff',
    tintColor:'#fff',
    component: FeedScreen
  },
  takePhoto: {
    title: 'Photo',
    barTintColor:'#333333',
    titleTextColor:'#ffffff',
    tintColor:'#fff',
    component: TakePhotoScreen
  },
  photoReview: {
    title: 'Write a Caption',
    barTintColor:'#333333',
    titleTextColor:'#ffffff',
    tintColor:'#fff',
    component: PhotoReviewScreen
  },
  commitAndUpload: {
    title: 'uploading...',
    barTintColor:'#333333',
    titleTextColor:'#ffffff',
    tintColor:'#fff',
    component: CommitAndUploadScreen
  }
};
for (key in Routes) {
  Routes[key].passProps = {routes: Routes};
}
module.exports = Routes;
