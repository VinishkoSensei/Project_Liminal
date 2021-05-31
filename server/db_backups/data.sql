INSERT INTO liminal.author (nickname,family_name,"name") VALUES
	 ('Test Author #1','Test','Test'),
	 ('Test Author #2','Test 2','Test 2'),
	 ('TestAuthor2',NULL,NULL),
	 ('TestAuthor1',NULL,NULL),
	 ('Allj(Элджей)',NULL,NULL);
	 
INSERT INTO liminal.genre ("name") VALUES
	 ('Test Genre'),
	 ('Test Genre 2'),
	 ('TestGenre1'),
	 ('Rap ');
	 
INSERT INTO liminal.login (email,hash) VALUES
	 ('EMAILTEST@TEST.TEST','121352ffbbsf'),
	 ('br@gmail.com','$2a$10$LGZ.5lN/WSiiLNkiA/U9SeHjsALw8u1IDhwIvRH6FFRfjEs94Lwdm'),
	 ('test@test.com','$2a$10$/fy0CB.ax3MM8Xjiv7DqTuSxjf75ROEK75Tztl/sCYRx7NTKf.t7.'),
	 ('te@test.com','$2a$10$9A57DFqYtKbnDKYlz8uj8uddzc/d41coUBpiWs3yVPlIsY1AQT2qi'),
	 ('test@gmail.com','$2a$10$GveNwMNncHrpXf9ZxQ.0OuVKngHVqNc989XK85eO4z48DnkGJdyDK');
	 
INSERT INTO liminal.point (track_id,point) VALUES
	 (17,44.721634);
	 
INSERT INTO liminal.radioqueue (track_id,"cycle") VALUES
	 (2,2),
	 (3,2),
	 (1,3);
	 
INSERT INTO liminal.track ("path","name",author_id,genre_id,cover,duration) VALUES
	 ('./files/music/1.mp3','Track 1',1,1,'1.jpg','00:01:05'),
	 ('./files/music/3.mp3','Track 3',1,1,'3.jpg','00:01:00'),
	 ('./files/music/2.mp3','Track 2',2,2,'2.jpg','00:02:02'),
	 ('./files/music/1.mp3','Track 4',1,1,'1.jpg','00:01:05'),
	 ('./files/music/3.mp3','Track 5',1,1,'3.jpg','00:01:00'),
	 ('./files/music/2.mp3','Track 6',2,2,'2.jpg','00:02:02'),
	 ('./files/music/8671687b-9509-4c56-9449-fc0d16bd9b3e.mp3','test tr',4,3,NULL,'00:04:14'),
	 ('./files/music/7c33be54-f702-41c7-8f6b-e76fbc398d2a.mp3','Нло',6,5,NULL,'00:04:14'),
	 ('./files/music/1af28409-ad76-4512-b296-ac0c71f2de5d.mp3','Нло',6,5,NULL,'00:04:14'),
	 ('./files/music/a58e9e6e-fbd0-4354-96a1-4ef998f5b391.mp3','Нло',6,5,NULL,'00:04:14');

INSERT INTO liminal.track ("path","name",author_id,genre_id,cover,duration) VALUES
	 ('./files/music/42c7d2cb-4963-4480-96f6-d9fca05f121b.mp3','Нло',6,5,NULL,'00:04:14'),
	 ('./files/music/931684f2-52bd-49bc-b4c7-7466114ca17b.mp3','Нло',6,5,NULL,'00:04:14');
	 
INSERT INTO liminal."user" (id,last_name,first_name,middle_name,birth_date,subscribed,email,phone,avatar,isadmin) VALUES
	 (42,'test','test',NULL,'2021-05-06',false,'test@test.com','32464','a3ad39d3-82e6-4ba6-8e67-d01bc488d043.jpg',false),
	 (43,'te','te',NULL,'2021-05-07',false,'te@test.com','43643','4c609ed3-d9fd-4696-8421-c2689068637c.jpg',false),
	 (44,'testfm','testnm',NULL,'1990-01-01',false,'test@gmail.com','9819999999','90c609b2-591b-4d0d-ae27-2857394a4ada.jpg',false),
	 (36,'bruu','bruh',NULL,'2021-04-01',false,'br@gmail.com','4225332','b371b905-1df2-437e-9092-1f276c97165a.dat',true),
	 (1,'Doe','John',NULL,'1997-01-01',true,'johndoe@gmail.com','9992134567','1.jpg',false);