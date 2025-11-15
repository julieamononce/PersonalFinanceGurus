drop table if exists user_login_data; -- if there's existing table (data), then remove it

create table user_login_data (
    id integer AUTO_INCREMENT primary key,
    username varchar(50) not null, -- attribute name || attribute datatype
    pass_hash varchar(50) not null
);

/*Master Doc Schema, must be sorted into different financial statements (IS, BS, RE, and Cash FLows)*/
create table User_transactions(
    id integer AUTO_INCREMENT primary key ,
    user_id integer not null,
    transaction_date date default current_timestamp,
    Transaction_desc text,
    transaction_type varchar(50),
    is_credit boolean,
    amount decimal(10,2) not null,
    foreign key (user_id) references user_login_data(id)
);


INSERT INTO user_login_data(id, username, pass_hash) VALUES(1, 'amononce', '123internetstreet');