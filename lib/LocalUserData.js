var React = require('react-native');
const Globals = require('./Globals');
const FBLoginManager = require('NativeModules').FBLoginManager;
var CurrentUser = require('./CurrentUser');
var {AsyncStorage, ActionSheetIOS} = React;

class LocalUserData{

  async loadProfileFromStorage(){
    try{
      var value = await AsyncStorage.getItem(Globals.USER_STORAGE_KEY);
      if(value !== null){
        let userdata = JSON.parse(value);
        this.setUserDataLocally(userdata);
      }
    }catch(e){
      console.log('async storage retrieval failed', e);
    }
  }

  setUserDataLocally(data){
    console.log('setting local user data to', data)
    CurrentUser.name = data.name;
    CurrentUser.id = data.id;
    CurrentUser.picture = data.picture;
  }

  clearUserDataLocally(){
    CurrentUser.name = null;
    CurrentUser.id = null;
    CurrentUser.picture = null;
  }


  async storeUserData(userData){
    await AsyncStorage.setItem(Globals.USER_STORAGE_KEY, JSON.stringify(userData)).then(()=>{
      this.setUserDataLocally(userData);
    });
  }

  clearUserData(){
    return AsyncStorage.removeItem(Globals.USER_STORAGE_KEY).then(() => {
      this.clearUserDataLocally();
    });
  }

  logout(){
    var p = new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if(!error){
          this.clearUserData().then(()=>{
            resolve();
          });
        }else{
          console.log('logout error!', error);
          reject();
        }
      });
    });

    return p;
  }

  showLogoutActionSheet(){
    var p = new Promise((resolve, reject) => {
      ActionSheetIOS.showActionSheetWithOptions({
        title: 'Are you sure you want to log out?',
        options:['Log Out', 'Cancel'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0
      }, (selectedIndex) => {
        if(selectedIndex === 0){
          resolve(this.logout());
        }else{
          reject();
        }
      });
    });

    return p;
  }

}

module.exports = new LocalUserData();
