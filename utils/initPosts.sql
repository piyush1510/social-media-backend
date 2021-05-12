use social;

create table posts(
    id int not null primary key auto_increment,
    title varchar(255) not null,
    content TEXT not null,
    image_link TEXT not null,
    user_id int not null,
    created_on DATETIME not null DEFAULT NOW(),
    foreign key(user_id) references users(id)
)