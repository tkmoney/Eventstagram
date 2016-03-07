var FeedScreen = require('./App/Components/FeedScreen');
var TakePhotoScreen = require('./App/Components/TakePhotoScreen');

var Routes = {
  main: {
    title: 'Photo Feed',
    barTintColor:'#2A5C7E',
    titleTextColor:'#ffffff',
    component: FeedScreen
  },
  takePhoto: {
    title: 'Photo',
    barTintColor:'#333333',
    titleTextColor:'#ffffff',
    component: TakePhotoScreen
  }
};
for (key in Routes) {
  Routes[key].passProps = {routes: Routes};
}
module.exports = Routes;
