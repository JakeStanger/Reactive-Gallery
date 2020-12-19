CREATE DATABASE IF NOT EXISTS `gallery`;
GRANT ALL ON `gallery`.* TO 'gallery'@'%';

USE `gallery`;

create table categories
(
    id   int unsigned auto_increment
        primary key,
    name varchar(128) null,
    constraint name
        unique (name),
    constraint name_2
        unique (name)
);

create table events
(
    id         int auto_increment
        primary key,
    name       tinytext null,
    location   text     null,
    start_time datetime null,
    end_time   datetime null
)
    charset = utf8;

create table locations
(
    id   int auto_increment
        primary key,
    name varchar(32) not null,
    constraint name
        unique (name)
)
    charset = utf8;

create table price_group
(
    id           int auto_increment
        primary key,
    name         tinytext not null,
    description  text     null,
    ratio_width  tinyint  null,
    ratio_height tinyint  null,
    constraint price_group_name_uindex
        unique (name) using hash
);

create table images
(
    id             int auto_increment
        primary key,
    name           text                 not null,
    description    text                 null,
    filename       varchar(128)         not null,
    width          int                  null,
    height         int                  null,
    exposure       float                null,
    focal_length   int                  null,
    aperture       int                  null,
    iso            int                  null,
    camera_model   varchar(32)          null,
    taken_time     datetime             null,
    location_key   int                  null,
    deleted        tinyint(1) default 0 null,
    price_group_id int                  null,
    constraint filename
        unique (filename),
    constraint images_ibfk_1
        foreign key (location_key) references locations (id),
    constraint images_price_group_id_fk
        foreign key (price_group_id) references price_group (id)
)
    charset = utf8;

create table image_category
(
    image_id    int          not null,
    category_id int unsigned not null,
    primary key (image_id, category_id),
    constraint image_category_ibfk_1
        foreign key (image_id) references images (id)
            on update cascade on delete cascade,
    constraint image_category_ibfk_2
        foreign key (category_id) references categories (id)
            on update cascade on delete cascade
);

create index category_id
    on image_category (category_id);

create index location_key
    on images (location_key);

create table price
(
    id             int auto_increment
        primary key,
    name           tinytext null,
    unframed       float    null,
    framed         float    null,
    price_group_id int      not null,
    postage        float    null,
    constraint price_group
        foreign key (price_group_id) references price_group (id)
);

create table tags
(
    id   int auto_increment
        primary key,
    name varchar(32) not null,
    constraint name
        unique (name)
)
    charset = utf8;

create table image_tag
(
    image_id int not null,
    tag_id   int not null,
    primary key (image_id, tag_id),
    constraint image_tag_ibfk_1
        foreign key (image_id) references images (id),
    constraint image_tag_ibfk_2
        foreign key (tag_id) references tags (id)
)
    charset = utf8;

create index tag_id
    on image_tag (tag_id);

create table users
(
    id         int auto_increment
        primary key,
    username   varchar(32)  not null,
    password   varchar(100) not null,
    can_edit   tinyint(1)   null,
    can_upload tinyint(1)   null,
    email      varchar(128) null,
    constraint password
        unique (password),
    constraint username
        unique (username),
    check (`can_edit` in (0, 1)),
    check (`can_upload` in (0, 1))
)
    charset = utf8;

create table basket_item
(
    id       int auto_increment
        primary key,
    quantity int        default 1 null,
    framed   tinyint(1) default 0 null,
    image_id int                  not null,
    user_id  int                  not null,
    price_id int                  not null,
    constraint basket_item_images_id_fk
        foreign key (image_id) references images (id),
    constraint basket_item_price_id_fk
        foreign key (price_id) references price (id),
    constraint basket_item_users_id_fk
        foreign key (user_id) references users (id)
);
