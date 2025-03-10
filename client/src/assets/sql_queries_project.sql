-- challenge 1
-- for admin

create database Hogwarts;
use Hogwarts;

create table students 
(
student_id int auto_increment primary key,
first_name varchar(50) not null,
last_name varchar(50) not null,
year_of_birth int not null,
role varchar(50) not null,
gender varchar(10) not null
);
    
insert into students (first_name, last_name, year_of_birth, role, gender) values
('Fred', 'Weasley', 1978, 'Student', 'Male'),
('George', 'Weasley', 1978, 'Student', 'Male'),
('Seamus', 'Finnigan', 1979, 'Student', 'Male'),
('Draco', 'Malfoy', 1980, 'Student', 'Male'),
('Terry', 'Boot', 1979, 'Student', 'Male'),
('Dean', 'Thomas', 1980, 'Student', 'Male'),
('Lavender', 'Brown', 1979, 'Student', 'Female'),
('Neville', 'Longbottom', 1980, 'Student', 'Male'),
('Anthony', 'Goldstein', 1980, 'Student', 'Male'),
('Cho', 'Chang', 1979, 'Student', 'Female'),
('Parvati', 'Patil', 1979, 'Student', 'Female'),
('Michael', 'Corner', 1980, 'Student', 'Male'),
('Blaise', 'Zabini', 1980, 'Student', 'Male'),
('Padma', 'Patil', 1979, 'Student', 'Female'),
('Ernie', 'Macmillan', 1980, 'Student', 'Male'),
('Susan', 'Bones', 1979, 'Student', 'Female'),
('Cedric', 'Diggory', 1977, 'Student', 'Male'),
('Pansy', 'Parkinson', 1979, 'Student', 'Female'),
('Hermione', 'Granger', 1979, 'Student', 'Female'),
('Ron', 'Weasley', 1980, 'Student', 'Male'),
('Vincent', 'Crabbe', 1980, 'Student', 'Male'),
('Gregory', 'Goyle', 1980, 'Student', 'Male');

select * from students;

-- drop table students;
-- for user
--easy, medium, hard
insert into students (first_name, last_name, year_of_birth, role, gender) value ('Harry','Potter', 1980, 'Student', 'Male');

-- challenge 2
-- for admin
select * from students;

-- for user
--easy, medium, hard
select student_id from students where first_name = 'Harry';

-- challenge 3
-- for admin
create table staff 
(
staff_id int auto_increment primary key,
first_name varchar(50) not null,
last_name varchar(50) not null,
gender varchar(10) not null,
role varchar(50) not null,
contact_info varchar(50) not null
);

insert into staff (first_name, last_name, gender, role, contact_info) values 
('Aurora', 'Sinistra', 'Female', 'Astronomy Professor', 'sinistra@hogwarts.edu'),
('Minerva', 'McGonagall', 'Female', 'Deputy Headmistress', 'mcgonagall@hogwarts.edu'),
('Albus', 'Dumbledore', 'Male', 'Headmaster', 'dumbledore@hogwarts.edu'),
('Severus', 'Snape', 'Male', 'Potions Master', 'snape@hogwarts.edu'),
('Filius', 'Flitwick', 'Male', 'Charms Professor', 'flitwick@hogwarts.edu'),
('Pomona', 'Sprout', 'Female', 'Herbology Professor', 'sprout@hogwarts.edu'),
('Sybill', 'Trelawney', 'Female', 'Divination Professor', 'trelawney@hogwarts.edu'),
('Remus', 'Lupin', 'Male', 'Defense Against the Dark Arts Professor', 'lupin@hogwarts.edu'),
('Rubeus', 'Hagrid', 'Male', 'Care of Magical Creatures Professor', 'hagrid@hogwarts.edu'),
('Gilderoy', 'Lockhart', 'Male', 'Defense Against the Dark Arts Professor', 'lockhart@hogwarts.edu'),
('Horace', 'Slughorn', 'Male', 'Potions Master', 'slughorn@hogwarts.edu'),
('Madam', 'Hooch', 'Female', 'Flying Instructor', 'hooch@hogwarts.edu'),
('Madam', 'Pomfrey', 'Female', 'Matron', 'pomfrey@hogwarts.edu'),
('Argus', 'Filch', 'Male', 'Caretaker', 'filch@hogwarts.edu'),
('Rubeus', 'Hagrid', 'Male', 'Keeper of Keys and Grounds', 'hagrid@hogwarts.edu'),
('Professor', 'Binns', 'Male', 'History of Magic Professor', 'binns@hogwarts.edu'),
('Charity', 'Burbage', 'Female', 'Muggle Studies Professor', 'burbage@hogwarts.edu'),
('Quirinus', 'Quirrell', 'Male', 'Defense Against the Dark Arts Professor', 'quirrell@hogwarts.edu');

select * from staff;

-- drop table staff
-- for user
-- easy
select contact_info from staff where first_name = 'Rubeus' and last_name = 'Hagrid';
-- medium, hard
select contact_info from staff where role = 'Keeper of Keys and Grounds';

-- CHALLENGE 4
-- for admin
create table vaults (
    vault_id int primary key,
    vault_username varchar(50) not null,
    balance int not null,
    currency varchar(10) default 'Galleons'
);
    
insert into vaults (vault_id, vault_username, balance, currency) values
(325, 'Ron Weasley', 500, 'Galleons'),
(212, 'Hermione Granger', 1500, 'Galleons'),
(515, 'Albus Dumbledore', 10000, 'Galleons'),
(411, 'Draco Malfoy', 2000, 'Galleons'),
(799, 'Neville Longbottom', 800, 'Galleons'),
(133, 'Luna Lovegood', 1200, 'Galleons'),
(672, 'Fred Weasley', 700, 'Galleons'),
(673, 'George Weasley', 750, 'Galleons'),
(984, 'Rubeus Hagrid', 400, 'Galleons'),
(687, 'Harry Potter', 1000, 'Galleons'),
(812, 'Ginny Weasley', 900, 'Galleons'),
(914, 'Minerva McGonagall', 5000, 'Galleons'),
(101, 'Severus Snape', 6000, 'Galleons'),
(288, 'Sirius Black', 4500, 'Galleons'),
(345, 'Tom Riddle', 2500, 'Galleons');

select * from vaults;
-- drop table vaults; 
-- for user
-- easy
update vaults set balance = balance - 500 where vault_id = 687;
-- medium
update vaults set balance = balance - (balance * 0.50) where vault_id = 687;
-- hard
update vaults set balance = balance - (balance / 2) where vault_id = 687;

-- CHALLENGE 5
-- for admin
create table shops (
shop_id int auto_increment primary key,
shop_name varchar(100) not null,
item_name varchar(100) not null,
item_description text not null,
item_price int
);

insert into shops (shop_name, item_name, item_description, item_price) values
('Ollivanders', 'Wand', 'A magical instrument used to channel magic', 100),
('Flourish and Blotts',  'Spellbook', 'A tome containing spells and incantations', 50),
('Potage''s Cauldron Shop', 'Cauldron', 'A vessel used for brewing potions', 75),
('Madam Malkin’s Robes for All Occasions', 'Robe', 'A wizarding robe for daily use', 40),
('Magical Menagerie','Owl', 'A magical bird used to deliver messages', 90),
('Quality Quidditch Supplies','Quidditch Broom', 'A high-performance broom for Quidditch', 110),
('Weasleys’ Wizard Wheezes','Extendable Ears', 'Magical device for eavesdropping', 25);

select * from shops;

-- drop table shops

-- for user
-- easy
select max(item_price) from shops;
-- medium
select sum(item_price) as total_price from shops;
-- hard
select count(*) as affordable_items from shops where item_price < 100;

-- challenge 6
-- for admin
create table wands (
wand_id int auto_increment primary key,
wood_type varchar(50) not null,
core_material varchar(50) not null,
length float not null,
owner_id  int,
foreign key (owner_id) references students(student_id) 
on delete cascade
on update cascade
);

-- show create table wands;

insert into wands (wood_type, core_material, length, owner_id) values 
('Cherry', 'Unicorn Hair', 13.0, 7),
('Yew', 'Phoenix Feather', 13.5, 2),
('Vine', 'Dragon heartstring', 10.75,3),
('Maple', 'Unicorn Hair', 9.5, 4),
('Ebony', 'Dragon Heartstring', 12.0, 5),
('Willow', 'Phoenix Feather', 10.5, 6),
('Holly', 'Phoenix Feather', 11.0, null),
('Hawthorn', 'Dragon Heartstring', 10.75, 8);

select * from wands;
-- drop table wands;
-- for user
-- easy
select * from wands where owner_id is null;
-- medium
select * from wands where owner_id is null and length >= 10;
-- hard
select * from wands where owner_id is null and wood_type = 'Holly' and core_material = 'Phoenix Feather';

update wands set owner_id = 23 where wand_id = 7;

-- challenge 7
-- for admin
update students set role = 'Wizard' where gender = "Male" and student_id != 23;
update students set role = 'Witch' where gender = "Female" and student_id > 0;
select * from students;
-- for user 
-- easy, medium, hard
update students set role = 'Wizard' where student_id = 23;

-- challenge 8
-- for admin
create table friends (
    student_id int not null,
    friend_id int not null,
    primary key (student_id, friend_id),
    foreign key (student_id) references students(student_id) on delete cascade on update cascade,
    foreign key (friend_id) references students(student_id) on delete cascade on update cascade
);
select * from friends;
-- drop table friends;
-- user
-- easy, medium, hard
insert into friends (student_id, friend_id) values (23,20), (20,23);

-- challenge 9
-- for admin
select * from students;
-- alter table students drop column house_id;
-- for user
-- easy
alter table students add column house_id int;
-- medium, hard
alter table students add column house_id int default 0;

-- challenge 10
-- for admin
create table houses (
    house_id int auto_increment primary key,
    house_name varchar(50),
    characteristic text
);
insert into houses (house_name, characteristic) values 
('Gryffindor', 'Bravery, Determination, Courage'),
('Hufflepuff', 'Loyalty, Patience, Fairness'),
('Ravenclaw', 'Wisdom, Creativity, Intelligence'),
('Slytherin', 'Ambition, Cunning, Resourcefulness');

select * from houses;
-- Assign House IDs for Students
update students set house_id = 1 where first_name = 'Fred' and last_name = 'Weasley' and student_id = "1";  -- Gryffindor
update students set house_id = 1 where first_name = 'Seamus' and last_name = 'Finnigan' and student_id = "3";  -- Gryffindor
update students set house_id = 4 where first_name = 'Draco' and last_name = 'Malfoy' and student_id = "4";  -- Slytherin
update students set house_id = 1 where first_name = 'George' and last_name = 'Weasley' and student_id = "2";  -- Gryffindor
update students set house_id = 3 where first_name = 'Terry' and last_name = 'Boot' and student_id = "5";  -- Ravenclaw
update students set house_id = 1 where first_name = 'Dean' and last_name = 'Thomas' and student_id = "6";  -- Gryffindor
update students set house_id = 1 where first_name = 'Lavender' and last_name = 'Brown' and student_id = "7";  -- Gryffindor
update students set house_id = 4 where first_name = 'Neville' and last_name = 'Longbottom' and student_id = "8";  -- Gryffindor
update students set house_id = 3 where first_name = 'Anthony' and last_name = 'Goldstein' and student_id = "9";  -- Ravenclaw
update students set house_id = 3 where first_name = 'Cho' and last_name = 'Chang' and student_id = "10";  -- Ravenclaw
update students set house_id = 1 where first_name = 'Parvati' and last_name = 'Patil' and student_id = "11";  -- Gryffindor
update students set house_id = 2 where first_name = 'Michael' and last_name = 'Corner' and student_id = "12";  -- Hufflepuff
update students set house_id = 2 where first_name = 'Blaise' and last_name = 'Zabini' and student_id = "13";  -- Hufflepuff
update students set house_id = 4 where first_name = 'Padma' and last_name = 'Patil' and student_id = "14";  -- Ravenclaw
update students set house_id = 2 where first_name = 'Ernie' and last_name = 'Macmillan' and student_id = "15";  -- Hufflepuff
update students set house_id = 1 where first_name = 'Cedric' and last_name = 'Diggory' and student_id = "17";  -- Gryffindor
update students set house_id = 4 where first_name = 'Pansy' and last_name = 'Parkinson' and student_id = "18";  -- Slytherin
update students set house_id = 1 where first_name = 'Hermione' and last_name = 'Granger' and student_id = "19";  -- Gryffindor
update students set house_id = 1 where first_name = 'Ron' and last_name = 'Weasley' and student_id = "20";  -- Gryffindor
update students set house_id = 2 where first_name = 'Susan' and last_name = 'Bones' and student_id = "16";  -- Hufflepuff
update students set house_id = 4 where first_name = 'Vincent' and last_name = 'Crabbe' and student_id = "21";  -- Slytherin
update students set house_id = 4 where first_name = 'Gregory' and last_name = 'Goyle' and student_id = "22";  -- Slytherin
update students set house_id = 1 where first_name = 'Harry' and last_name = 'Potter' and student_id = 23;  -- Gryffindor

-- drop table houses;
-- for user
-- easy
select * from houses where characteristic like 'Bravery%';
-- medium
select * from houses where characteristic like '%Courage';
-- hard
select * from houses where characteristic like '%Determination%';

-- challenge 11
-- for admin
create table history (
    event_id int auto_increment primary key,
    event_title varchar(100) not null,
    event_description text not null,
    event_date date not null
);
insert into history (event_title, event_description, event_date) values 
('Founding of Hogwarts', 'The four founders establish Hogwarts School of Witchcraft and Wizardry.','1000-01-01'),
('Battle of Hogwarts', 'The final battle between Harry Potter and Voldemort takes place, leading to Voldemort''s defeat.','1998-05-02'),
('Creation of the Hogwarts Express', 'The Hogwarts Express is created to transport students to and from Hogwarts.','1998-05-02'),
('Discovery of the Philosopher''s Stone', 'Nicolas Flamel and Dumbledore successfully create the Philosopher''s Stone.','1992-06-04'),
('Goblet of Fire Event', 'The Triwizard Tournament selects champions.', '1994-10-31'),
('The Battle of the Department of Mysteries', 'A fight between Death Eaters and Dumbledore’s Army.', '1996-06-18'),
('The Second Wizarding War', 'Voldemort rises to power and the wizarding world enters war.', '1995-07-31');
select * from history;
-- for user
-- easy
select event_title, event_date, event_description  from history order by event_title asc;
-- medium
select event_title, event_date, event_description from history order by event_date asc;
-- hard
select event_title, event_date, event_description from history	order by event_date desc, event_title asc;

-- challenge 12
-- for admin
create table library_books (
    book_id int auto_increment primary key,
    title varchar(100) not null,
    author varchar(100) not null,
    section varchar(50) not null,
    description text not null
);
insert into library_books (title, author, section, description) values 
('Secrets of the Darkest Art', 'Unknown', 'Restricted', 'A book detailing the darkest forms of magic.'),
('The Philosopher''s Stone', 'Nicolas', 'Restricted', 'A detailed account of the creation and properties of the Philosophe''s Stone.'),
('The History of Magic', 'Bathilda Bagshot', 'General', 'An overview of magical history from ancient times to the present.'),
('Advanced Potion-Making', 'Libatius Borage', 'Restricted', 'A comprehensive guide to brewing advanced potions.'),
('Magical Theory', 'Adalbert Waffling', 'General', 'Explores the fundamental principles of magic.'),
('Fantastic Beasts and Where to Find Them', 'Sam Scamander', 'Reference', 'A detailed description of magical creatures and their habitats.'),
('The Dark Arts Outsmarted', 'Eldritch Diggory', 'Restricted', 'Strategies for defending against dark magic.'),
('Hogwarts: A History', 'Bathilda Bagshot', 'General', 'A historical account of Hogwarts School of Witchcraft and Wizardry.'),
('The Book of Spells', 'Miranda Goshawk', 'Reference', 'A practical guide to spellcasting for witches and wizards.'),
('The Tales of Beedle the Bard', 'Beedle the Bard', 'General', 'A collection of magical fairy tales and folklore.');

select * from library_books;
select title,section from library_books;
-- drop table library_books

-- for user
-- easy
select title, author from library_books where author like '__c%';
-- medium
select title, author from library_books where author like 'N%s';
-- hard
select title, author from library_books where title like '%Philosopher''s Stone%' and author like '%ol%';

-- challenge 13
-- for admin
create table obstacles (
    obstacle_id int auto_increment primary key,
    obstacle_name varchar(100) not null,
    description text not null,
    guarding varchar(100) not null,
    difficulty_level varchar(20) not null, -- Indicates the difficulty (e.g., 'Easy', 'Medium', 'Hard')
    requires_magic boolean not null, -- Whether magic is required to bypass the obstacle
    bypass_method varchar(100) not null, -- The method to bypass the obstacle (e.g., 'Music', 'Light', 'Strength')
    location varchar(100) not null, -- The approximate location of the obstacle
    guarding_priority int not null -- The priority of guarding the item (e.g., higher values for more critical obstacles)
);

insert into obstacles (obstacle_name, description, guarding, difficulty_level, requires_magic, bypass_method, location, guarding_priority) values 
('Fluffy', 'A three-headed dog that guards the trapdoor leading to the deeper challenges.', 'Philosopher''s Stone', 'Tough', TRUE, 'Music', 'Third Floor Corridor', 5),
('Devil''s Snare', 'A dangerous plant that entangles those who fall into it.', 'Philosopher''s Stone', 'Medium', TRUE, 'Light or Fire', 'Underground Chamber', 4),
('Flying Keys', 'A room filled with enchanted keys; the correct one must be caught to proceed.', 'Philosopher''s Stone', 'Medium', FALSE, 'Speed and Observation', 'Key Room', 3),
('Chessboard Chamber', 'A giant chessboard where players must win a game of Wizard’s Chess to advance.', 'Philosopher''s Stone', 'Tough', FALSE, 'Strategic Thinking', 'Chess Room', 4),
('Troll', 'A giant troll that must be subdued.', 'Philosopher''s Stone', 'Easy', TRUE, 'Strength or Magic', 'Bathroom', 2),
('Potion Riddle', 'A logic puzzle involving bottles of potion; one allows you to move forward, one to move back, and others are deadly.', 'Philosopher''s Stone', 'Tough', FALSE, 'Logic', 'Potion Room', 3),
('Mirror of Erised', 'The final obstacle where only someone who seeks the Stone but not to use it can retrieve it.', 'Philosopher''s Stone', 'Very Hard', TRUE, 'Pure Intentions', 'Final Chamber', 5);

select * from obstacles;
-- drop table obstacles;
-- for user
-- easy, medium, hard
select obstacle_name, location, bypass_method from obstacles;

-- challenge 14
-- for admin
create table musical_instruments (
    instrument_id int auto_increment primary key,
    instrument_name varchar(50) not null,
    sound_level int not null, -- Sound level on a scale of 1 to 10
    effectiveness int not null -- Effectiveness in calming magical creatures (1 to 10 scale)
);

insert into musical_instruments (instrument_name, sound_level, effectiveness) values
('Oboe', 6, 5 ),
('Xylophone', 7, 6),
('Guitar', 5, 6),
('Drum', 9, 4),
('Violin', 7, 6),
('Piano', 6, 5),
('Trumpet', 9, 5),
('Clarinet', 7, 6),
('Cello', 7, 5),
('Tambourine', 5, 4),
('Saxophone', 7, 5),
('Triangle', 4, 3),
('Harp', 8, 10),	
('Flute', 8, 8),
('Bagpipes', 10, 4);

select * from musical_instruments;
-- drop table musical_instruments
-- for user
-- easy
select instrument_name, sound_level, effectiveness from musical_instruments where effectiveness >= 8 or sound_level = 8;
-- medium
select instrument_name, sound_level, effectiveness from musical_instruments where effectiveness between 8 and 10;
-- hard
select instrument_name, sound_level, effectiveness from musical_instruments where effectiveness > 7 and sound_level not between 1 and 7;

-- challenge 15
-- for admin
create table spells (
    spell_id int auto_increment primary key,
    spell_name varchar(50) not null,
    emits_light boolean not null,    -- Whether the spell emits light
    is_flammable boolean not null,   -- Whether the spell is flammable
    effectiveness int not null       -- Effectiveness rating (1 to 10)
);
insert into spells (spell_name, emits_light, is_flammable, effectiveness) values
('Expecto Patronum', TRUE, FALSE, 6),
('Stupefy', FALSE, FALSE, 7),
('Alohomora', FALSE, FALSE, 5),
('Wingardium Leviosa', FALSE, FALSE, 6),
('Expelliarmus', FALSE, FALSE, 7),
('Incendio', FALSE, TRUE, 8),
('Lumos', TRUE, FALSE, 9);

select * from spells;
-- drop table spells
-- for user
-- easy
select spell_name, effectiveness from spells where (emits_light = TRUE or is_flammable = TRUE) and effectiveness >= 7;
-- medium
select spell_name, effectiveness from spells where (emits_light = TRUE or is_flammable = TRUE)  and effectiveness between 7 and 10;
-- hard
select spell_name, effectiveness from spells where (emits_light = TRUE or is_flammable = TRUE) and effectiveness not between 1 and 6;

-- challenge 16
-- for admin 
create table magical_keys (
    key_id int auto_increment primary key,
    color varchar(50) not null,
    key_condition varchar(50) not null,
    wing_status varchar(50) not null,
    speed int not null
);

insert into magical_keys (color, key_condition, wing_status, speed) values
('Silver', 'Old', 'Broken', 5),  
('Gold', 'New', 'Intact', 15),    
('Bronze', 'Old', 'Intact', 10), 
('Silver', 'New', 'Intact', 20), 
('Gold', 'Old', 'Broken', 8),    
('Bronze', 'New', 'Intact', 18), 
('Silver', 'Old', 'Intact', 12), 
('Bronze', 'Old', 'Broken', 6),   
('Gold', 'Old', 'Intact', 14),    
('Silver', 'Old', 'Broken', 3);

select * from magical_keys;
-- drop table magical_keys;

-- for user
-- easy
select * from magical_keys where speed = (select min(speed) from magical_keys);
-- medium
select * from magical_keys where speed = (select min(speed) from magical_keys where color = 'Silver' and wing_status = 'Broken');
-- hard
select * from magical_keys where speed = (select min(speed) from magical_keys where color = 'Silver' and key_condition = 'Old' and wing_status = 'Broken');

-- challenge 17
-- for admin
-- Create the chess_moves table
create table chessboard (
    game_id int not null,
    move_number int not null,
    piece_captured varchar(20) not null,
    result varchar(10) not null
);

-- Insert sample data based on the Philosopher's Stone chess event
insert into chessboard (game_id, move_number, piece_captured, result) values
(1, 3, 'Pawn', 'Win'),
(1, 7, 'Knight', 'Win'),
(1, 12, 'Bishop', 'Win'),
(2, 5, 'Pawn', 'Lose'),
(2, 8, 'Knight', 'Lose'),
(3, 4, 'Pawn', 'Win'),
(3, 9, 'Queen', 'Win'),
(3, 11, 'Bishop', 'Win'),
(4, 6, 'Pawn', 'Win'),
(4, 10, 'Knight', 'Win'),
(5, 2, 'Pawn', 'Lose'),
(5, 5, 'Bishop', 'Lose'),
(5, 7, 'Queen', 'Win'),
(6, 8, 'Pawn', 'Win'),
(6, 13, 'Rook', 'Win'),
(6, 14, 'Knight', 'Win'),
(7, 1, 'Pawn', 'Win'),
(7, 3, 'Bishop', 'Win'),
(8, 9, 'Knight', 'Lose'),
(8, 12, 'Queen', 'Win');
select * from chessboard;
-- drop table chessboard

-- for user
-- easy
select piece_captured, count(*) as total_captures from chessboard group by piece_captured;
-- medium
select piece_captured, count(*) as total_captures from chessboard group by piece_captured order by total_captures desc;
-- hard
select piece_captured, count(*) as total_captures from chessboard group by piece_captured having count(*) > 3;

-- CHALLENGE 18
-- for admin
create table monsters (
    monster_id int auto_increment primary key,
    monster_name varchar(100) not null,
    description text not null,
    status varchar(50) not null
);

insert into monsters (monster_name, description, status) values 
('Troll', 'A giant troll that must be subdued.', 'Active'),
('Fluffy', 'A three-headed dog guarding a trapdoor.', 'Defeated'),
('Devil''s Snare', 'A magical plant that entangles and suffocates.', 'Defeated'),
('Winged Keys', 'Enchanted keys that must be caught to unlock a door.', 'Defeated'),
('Basilisk', 'A giant serpent with a deadly gaze.', 'Inactive');

select * from monsters;

-- drop table monsters; 
-- for user
-- for all level
-- delete from monsters where monster_name = 'Troll';
delete from monsters where monster_id = 1;
-- to check
select * from monsters;

-- challenge 19
-- for admin
create table potions (
    potion_id int auto_increment primary key,
    potion_name varchar(50) not null,
    is_safe boolean not null
);

insert into potions (potion_name, is_safe) values 
('Noxious Draught', FALSE),    
('Venomous Brew', FALSE), 
('Potion of Return', TRUE),
('Crimson Curse', FALSE),     
('Mystic Mead', FALSE), 
('Elixir of Firewalk', TRUE),  
('Bewitching Wine', FALSE);

select * from potions;

create table clues (
    clue_id int auto_increment primary key,
    potion_id int references potions(potion_id) on delete cascade on update cascade,
    clue_text text not null
);

insert into clues (potion_id, clue_text) values 
(1, 'One sip, no return'),    
(2, 'Poison in every drop'), 
(3, 'Back to where you started'),  
(4, 'Red and full of peril'),     
(5, 'Blurs the mind'), 
(6, 'Lets you walk through fire'),  
(7, 'A trap in sweet disguise');

select * from potions;
-- drop table potions
select * from clues;
-- drop table clues

-- for user
-- easy
select p.potion_name from potions p join clues c on p.potion_id = c.potion_id where c.clue_text like 'Lets you walk through fire';
-- medium
select p.potion_name from potions p join clues c on p.potion_id = c.potion_id where p.is_safe = TRUE  and c.clue_text like 'Lets you walk through fire';
-- hard
select p.potion_name from potions p join clues c on p.potion_id = c.potion_id where p.is_safe = TRUE  and c.clue_text like '%fire%';

-- do not include
-- challenge 20
-- for admin
create table runes (
    rune_id int auto_increment primary key,
    rune_name varchar(50) not null,
    symbol varchar(5) not null
);

insert into runes (rune_name, symbol) values
('Algiz', 'ᛉ'),
('Fehu', 'ᚠ'),
('Uruz', 'ᚢ'),
('Ansuz', 'ᚨ'),
('Raidho', 'ᚱ'),
('Gebo', 'ᚷ'),
('Eiwaz', 'ᛇ');

create table clue_book (
    clue_id int primary key,
    rune_id int,
    clue_text varchar(255) not null,
    foreign key (rune_id) references runes(rune_id) on delete cascade on update cascade
);

insert into clue_book (clue_id, rune_id, clue_text) values
(101, 1, 'Protection and defense'),
(102, 2, 'Wealth and prosperity'),
(103, 4, 'Knowledge and wisdom'),
(104, 6, 'Partnership and balance');

select * from runes;
-- drop table runes
select * from clue_book;
-- drop table clue_book

-- for user
-- easy
select r.rune_name, r.symbol from runes r left join clue_book c on r.rune_id = c.rune_id where c.clue_id is null;
-- medium
select r.rune_name, r.symbol from runes r left join clue_book c on r.rune_id = c.rune_id where c.clue_id is null order by r.rune_name;
-- hard
select r.rune_name, r.symbol from runes r left join clue_book c on r.rune_id = c.rune_id where r.rune_id not in (select rune_id from clue_book);

-- challenge 20
-- for admin
create table desires (
    student_id int,
    desire varchar(255) not null,
    foreign key (student_id) references students(student_id) on delete cascade on update cascade
);

insert into desires (student_id, desire) values 
(4, 'To find the Philosopher''s Stone'),
(19, 'To become greatest witch of all time'), 
(20, 'To be Head Boy and Quidditch Captain'),
(23, 'To see my parents again');

select * from desires;
-- drop table desires

-- for user
-- easy
select s.first_name, s.last_name, d.desire from students s left join desires d on s.student_id = d.student_id where s.student_id = 23;
-- medium
select s.first_name, s.last_name, d.desire from students s left join desires d on s.student_id = d.student_id where first_name = 'Harry';
-- hard
select s.first_name, s.last_name, d.desire from students s left join desires d on s.student_id = d.student_id where first_name = 'Harry' and last_name = 'Potter';

-- challenge 21
-- for admin
create table artifacts (
    artifact_id int auto_increment primary key,
    name varchar(100) not null,
    owner varchar(100) default 'Unknown',
    status varchar(50) default 'Active',
    location varchar(100),
    access_level varchar(50) default 'Public'
);
insert into artifacts (name, owner, status, location, access_level) values
('Philosopher''s Stone', 'Dumbledore', 'Protected', 'Hogwarts Vault', 'Staff Only'),
('Elder Wand', 'Dumbledore', 'Active', 'Headmaster''s Office', 'Restricted'),
('Resurrection Stone', 'Unknown', 'Lost', 'Forbidden Forest', 'Hidden'),
('Sword of Gryffindor', 'Hogwarts', 'Stored', 'Headmaster''s Office', 'Accessible to Gryffindors'),
('Tom Riddle’s Diary', 'Destroyed', 'Inactive', 'Unknown', 'Forbidden');
select * from artifacts;
-- drop table artifacts

-- for user
-- easy, medium, hard
-- update artifacts set owner = 'Harry Potter' where name = 'Philosopher''s Stone';
update artifacts set owner = 'Harry Potter' where artifact_id = 1;






