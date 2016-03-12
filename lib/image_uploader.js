var RNUploader = require('NativeModules').RNUploader;


module.exports = function(photoDataURL, callback){


  let filename = (Math.random().toString() + Date.now() + '.jpg');
  let files = [{
    name: 'file[]',
    filename: filename,
    filepath: photoDataURL,
    filetype: 'image/jpg'
  }]

  let opts = {
    url: 'https://api.cloudinary.com/v1_1/dnhb1uskb/image/upload',
    files: files,
    method: 'POST',
    params:{'api_key': "558267288257165", "upload_preset": "csznxc0w"}
  };


  RNUploader.upload( opts, callback);
}