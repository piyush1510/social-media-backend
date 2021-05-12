use social;

create table users(
    id int not null auto_increment,
    email varchar(255) not null,
    password varchar(255),
    name varchar(255),
    profile_pic TEXT,
    primary key(id,email)
);