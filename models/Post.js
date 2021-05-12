const db = require('../utils/db');

export default class Post {
  constructor(title, caption, img_link, user_id) {
    this.title = title;
    this.caption = caption;
    this.img_link = img_link;
    this.user_id = user_id;
  }
  static getAll() {
    return db.execute('select * from posts');
  }
  static getOne(id) {
    return db.execute('select * from posts where id = ?', [id]);
  }
  save() {
    return db.execute(
        `   insert into posts
            (title,caption,img_link,user_id)
            values (?,?,?,?)`,
      [this.title, this.caption, this.img_link, this.user_id]
    );
  }
  remove(id){
      return db.execute("delete from users where id = ?",[id])
  }
}
