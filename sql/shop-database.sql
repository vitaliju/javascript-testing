CREATE TABLE shops (
  name VARCHAR(255),
  address VARCHAR(255),
  zip INT
);

CREATE TABLE shopItems (
  name VARCHAR(255),
  quantity INT,                //neteisingas price vietoj INT reikia DECIMAL
  price VARCHAR(255)
);

CREATE TABLE shopItems3 (
  name VARCHAR(255),
  quantity INT,
  price Decimal
);

CREATE TABLE shopItems2 (
  name VARCHAR(255),         
  quantity INT,
  price INT
);
// pakeicia INT i DECIMAL
alter table shopItems2 alter column price type decimal(10,2);

select * from shops

insert into shops (name, address, zip)
values ('Kika', 'Taikos pr.61', '91158'),
('Akvazoo', 'Kauno g.5', '91188'),
('Senukai', 'Islandijos pl.32', '47446'),
('Sportland', 'Karaliaus Mindaugo pr.49', '44333')

insert into shopItems (name, quantity, price)
values ('SKECHERS G ULTRA FLEX-A', '3', '16.48 €'),
(' ASUS VivoBook 15 OLED', '5', '869,00 €'),
('NATURE PROTECTION SUPERIOR CARE', '10', '1,79 €'),
('ROYAL CANIN', '15', '33,49 €')

select * from shopItems

insert into shopItems2 (name, quantity, price)
values ('ROYAL CANIN', 9, 33.5),
('Nike bateliai', 5, 45.40),
('Latte', 5, 3.6),
('NATURE PROTECTION Malt paste', 10, 1.79),
('NATURE PROTECTION vitamin', 10, 1.2)

select * from shopItems2

insert into shopItems3 (name, quantity, price)
values ('ROYAL CANIN', 9, 33.5),
('Nike bateliai', 5, 45.40),
('Latte', 5, 3.6),
('NATURE PROTECTION Malt paste', 10, 1.79),
('NATURE PROTECTION vitamin', 10, 1.2)

select * from shopItems3

select * from shopItems3
where quantity * price < 20
 
