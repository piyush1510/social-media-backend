const db = require('../utils/db');

class Post {
  constructor(title, content, image_link, user_id) {
    this.title = title;
    this.content = content;
    this.image_link = image_link;
    this.user_id = user_id;
  }
  static getAll() {
    return db.execute(`
    SELECT  posts.id AS id
       ,title
       ,content
       ,image_link
       ,name
       ,profile_pic
    FROM posts
    JOIN users
    ON user_id=users.id
    order by id desc
    `);
  }
  static getOne(id) {
    return db.execute('select * from posts where id = ?', [id]);
  }
  save() {
    return db.execute(
      `   insert into posts
            (title,content,image_link,user_id)
            values (?,?,?,?)`
      [this.title, this.content, this.image_link, this.user_id]
    );
  }
  remove(id, user_id) {
    return db.execute('delete from posts where id = ? and user_id = ?', [
      id,
      user_id,
    ]);
  }
}
module.exports = Post;
