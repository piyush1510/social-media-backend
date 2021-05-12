const db = require('../utils/db');

class User {
  constructor(email, name, password, profile_pic) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.profile_pic = profile_pic;
  }
  static getUserByEmail(email) {
    return db.execute('select * from users where email = ?', [email]);
  }
  save() {
    return db.execute(
      `
            insert into users
            (email,name,password,profile_pic)
            values
            (?,?,?,?)`,
      [this.email, this.name, this.password,this.profile_pic]
    );
  }
}
module.exports = User;
