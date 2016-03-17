var RNUploader = require('NativeModules').RNUploader;
const Globals = require('./Globals');


module.exports = function(photoDataURL, callback){



  let filename = (Math.random().toString() + Date.now() + '.jpg');
  let files = [{
    name: 'file[]',
    filename: filename,
    filepath: photoDataURL,
    filetype: 'image/jpg'
  }]

  let opts = {
    url: `https://api.cloudinary.com/v1_1/${Globals.CLOUDINARY_SIG}/image/upload`,
    files: files,
    method: 'POST',
    params:{'api_key': Globals.CLOUDINARY_KEY, "upload_preset": Globals.CLOUDINARY_PRESET}
  };

  console.log('img to upload', opts.url, opts.files);

  RNUploader.upload( opts, callback);
}