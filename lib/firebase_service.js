const Firebase = require('firebase');
const Globals = require('./Globals');
var CurrentUser = require('./CurrentUser');


class FirebaseUtil{
  constructor(args) {
    this.rootRef = new Firebase(`${Globals.FIREBASE_ROOT}`);
    this.photosRef = this.rootRef.child('items');
    this.usersRef = this.rootRef.child('users');
    this.commentsRef = this.rootRef.child('comments');
    this.likesRef = this.rootRef.child('likes');
  }

  formatPicURL(public_id, format){
    return `http://res.cloudinary.com/dnhb1uskb/image/upload/c_limit,h_400,q_jpegmini:1,w_320/${public_id}.${format}`;
  }

  addPhoto(data){
    var photo_item = this.photosRef.push();
    var comments_item = this.commentsRef.push();
    var likes_item = this.likesRef.push();

    return photo_item.setWithPriority({
      image: this.formatPicURL(data.public_id, data.format),
      user_id: CurrentUser.id,
      timestamp: Firebase.ServerValue.TIMESTAMP,
      comments: comments_item.key(),
      likes: likes_item.key(),
    }, Firebase.ServerValue.TIMESTAMP);
  }

  removePhoto(id){
    return this.photosRef.child(id).set(null);
  }

  addComment(comments_record_id, comment, user){
    var comments_record = this.commentsRef.child(comments_record_id);
    var new_comment = comments_record.push();
    return new_comment.set({
      user_id: user.id,
      comment: comment,
      timestamp: Firebase.ServerValue.TIMESTAMP
    });
  }

  removeComment(comments_record_id, comment_id){
    var comments_record = this.commentsRef.child(comments_record_id);
    return comments_record.child(comment_id).set(null);
  }

  addLike(likes_record_id, user){
    var likes_record = this.likesRef.child(likes_record_id);
    var new_like = likes_record.push();
    return new_like.set({
      user_id: user.id,
      timestamp: Firebase.ServerValue.TIMESTAMP
    });
  }

  removeLike(likes_record_id, like_id){
    var likes_record = this.likesRef.child(likes_record_id);
    return likes_record.child(like_id).set(null);
  }

  addUser(userdata){
    return this.usersRef.child(userdata.id).set({
      name: userdata.name, picture: userdata.picture, timestamp: Firebase.ServerValue.TIMESTAMP
    }).then(()=>{
      return this.usersRef.child(userdata.id).once('value');
    });
  }

  removeUser(id){
    return this.usersRef.child(id).set(null);
  }


  // methods
}

module.exports = new FirebaseUtil();
