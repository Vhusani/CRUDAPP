CREATE DATABASE clientsDB
GO

USE clientsDB
GO

CREATE TABLE clientsDetails(
	clientId int identity(1,1) primary key,
	clientName varchar(255),
	clientSurname varchar(255),
	clientPhone varchar(15),
	clientDOB date,
	clientAddress varchar(255),
	clientPhoto varchar(500)
)

insert into clientsDetails values
('Vhusani', 'Libago', '0711160206', '1996-11-06', 'South Africa','human.jpg'),
('Andani', 'Libago', '0711160206', '1992-03-30', 'South Africa','human.jpg')

select * from clientsDetails
