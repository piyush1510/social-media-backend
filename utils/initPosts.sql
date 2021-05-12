use social;

create table posts{
    id int not null primary key,
    title varchar(255) not null,
    content TEXT not null,
    image_link TEXT not null,
    user_id int not null,
    created_on DATETIME not null DEFAULT NOW()
}