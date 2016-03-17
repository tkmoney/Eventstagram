const Globals = require('./Globals');

class User {
  constructor(args = {name: 'Guest', id: null, picture: '', authToken: null}) {
    this.name = args.name;
    this.id = args.id;
    this.picture = args.picture;
    this.authToken = args.authToken;
  }

  // methods
}     

module.exports = User;
