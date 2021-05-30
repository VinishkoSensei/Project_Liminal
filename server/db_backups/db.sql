-- DROP SCHEMA liminal;

CREATE SCHEMA liminal AUTHORIZATION postgres;

-- DROP SEQUENCE liminal.author_id_seq;

CREATE SEQUENCE liminal.author_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.genre_id_seq;

CREATE SEQUENCE liminal.genre_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.login_id_seq;

CREATE SEQUENCE liminal.login_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.point_id_seq;

CREATE SEQUENCE liminal.point_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.radioqueue_id_seq;

CREATE SEQUENCE liminal.radioqueue_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.track_id_seq;

CREATE SEQUENCE liminal.track_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE liminal.users_id_seq;

CREATE SEQUENCE liminal.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- liminal.author definition

-- Drop table

-- DROP TABLE liminal.author;

CREATE TABLE liminal.author (
	id serial NOT NULL,
	nickname varchar(50) NOT NULL,
	family_name varchar(50) NULL,
	"name" varchar(50) NULL,
	CONSTRAINT author_pkey PRIMARY KEY (id)
);


-- liminal.genre definition

-- Drop table

-- DROP TABLE liminal.genre;

CREATE TABLE liminal.genre (
	id serial NOT NULL,
	"name" varchar(50) NULL,
	CONSTRAINT genre_pkey PRIMARY KEY (id)
);


-- liminal.login definition

-- Drop table

-- DROP TABLE liminal.login;

CREATE TABLE liminal.login (
	id serial NOT NULL,
	email varchar(50) NOT NULL,
	hash text NULL,
	CONSTRAINT login_pkey PRIMARY KEY (id)
);


-- liminal."user" definition

-- Drop table

-- DROP TABLE liminal."user";

CREATE TABLE liminal."user" (
	id int4 NOT NULL,
	last_name varchar(50) NOT NULL,
	first_name varchar(50) NOT NULL,
	middle_name varchar(50) NULL,
	birth_date date NOT NULL,
	subscribed bool NOT NULL DEFAULT false,
	email varchar(50) NOT NULL,
	phone varchar(15) NOT NULL,
	avatar varchar(200) NULL,
	isadmin bool NOT NULL DEFAULT false,
	CONSTRAINT users_c_email UNIQUE (email),
	CONSTRAINT users_c_phone UNIQUE (phone),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- liminal.track definition

-- Drop table

-- DROP TABLE liminal.track;

CREATE TABLE liminal.track (
	id serial NOT NULL,
	"path" varchar(150) NOT NULL,
	"name" varchar(50) NOT NULL,
	author_id int4 NULL,
	genre_id int4 NULL,
	cover varchar(150) NULL,
	duration time(0) NULL,
	CONSTRAINT track_pkey PRIMARY KEY (id),
	CONSTRAINT track_author_id_fkey FOREIGN KEY (author_id) REFERENCES liminal.author(id),
	CONSTRAINT track_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES liminal.genre(id)
);


-- liminal.point definition

-- Drop table

-- DROP TABLE liminal.point;

CREATE TABLE liminal.point (
	id serial NOT NULL,
	track_id int4 NOT NULL,
	point float4 NOT NULL,
	CONSTRAINT point_pkey PRIMARY KEY (id),
	CONSTRAINT point_track_id_fkey FOREIGN KEY (track_id) REFERENCES liminal.track(id)
);


-- liminal.radioqueue definition

-- Drop table

-- DROP TABLE liminal.radioqueue;

CREATE TABLE liminal.radioqueue (
	id serial NOT NULL,
	track_id int4 NOT NULL,
	"cycle" int4 NOT NULL DEFAULT liminal.selectqueuecycle(),
	CONSTRAINT radioqueue_pkey PRIMARY KEY (id),
	CONSTRAINT radioqueue_track_id_fkey FOREIGN KEY (track_id) REFERENCES liminal.track(id)
);



CREATE OR REPLACE PROCEDURE liminal.addpointtotrack(trid integer, po real)
 LANGUAGE plpgsql
AS $procedure$
BEGIN

	insert into liminal.point(track_id, point)
		values (trid,po);

end;
$procedure$
;

CREATE OR REPLACE FUNCTION liminal.addtoradioqueue(newtrackid integer)
 RETURNS TABLE(id integer, trackid integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	insert into liminal.radioqueue(track_id)
	values (newtrackid);

	RETURN QUERY SELECT  r.id, t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		join liminal.radioqueue r on t.id =r.track_id
	order by r.id;
end;
$function$
;

CREATE OR REPLACE PROCEDURE liminal.changerole(uid integer, role boolean)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
	update liminal.user
		set isadmin = role
		where id=uid;
end;
$procedure$
;

CREATE OR REPLACE FUNCTION liminal.changeuserinfo(tid integer, tvalue character varying, ttype character varying)
 RETURNS TABLE(last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
  
	case ttype
		when 'first_name' then
			update liminal.user
			set "first_name"=tvalue where "id"=tid;
		when 'last_name' then
			update liminal.user
			set "last_name"=tvalue where "id"=tid;
		when 'phone' then
			update liminal.user
			set "phone"=tvalue where "id"=tid;
		when 'file' then
			update liminal.user
			set "avatar"=tvalue where "id"=tid;
		else 
			raise 'Wrong type';
		end case;
		
	RETURN QUERY SELECT u.last_name, u.first_name, u.middle_name, 
    to_char(u.birth_date,'DD.MM.YYYY') as "birth_date", 
    u.subscribed, u.email, u.phone, u.avatar
	FROM liminal.user u
	where u.id=tid;
	
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.changeuserpassword(tid integer, tvalue character varying)
 RETURNS TABLE(last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
  	update liminal.login
		set "hash"=tvalue where "id"=tid;
		
	RETURN QUERY SELECT u.last_name, u.first_name, u.middle_name, 
    to_char(u.birth_date,'DD.MM.YYYY') as "birth_date", 
    u.subscribed, u.email, u.phone, u.avatar
	FROM liminal.user u
	where u.id=tid;
	
END;
$function$
;

CREATE OR REPLACE PROCEDURE liminal.clearcycle()
 LANGUAGE plpgsql
AS $procedure$
begin	
	update liminal.radioqueue
	set cycle=0;
END;
$procedure$
;

CREATE OR REPLACE FUNCTION liminal.deletefromradioqueue(index integer)
 RETURNS TABLE(id integer, trackid integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	delete from liminal.radioqueue
	where liminal.radioqueue.id=index;

	RETURN QUERY SELECT r.id, t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		join liminal.radioqueue r on t.id =r.track_id
	order by r.id;
end;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getauthors()
 RETURNS TABLE(id integer, nickname character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT a.id ,a.nickname 
		FROM liminal.author a
		order by a.nickname ASC; 
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getavatar(tid integer)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
begin
    RETURN (SELECT u.avatar
	FROM liminal.user u
	where u.id=tid);
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getgenres()
 RETURNS TABLE(id integer, name character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT g.id ,g."name" 
		FROM liminal.genre g
		order by g."name" ASC; 
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getnexttrackfromradioqueue()
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
declare 
	radioqueueid int;
	trackpath varchar;
begin	
	select r.id
	from liminal.radioqueue r
	into radioqueueid
	order by r."cycle" asc, r.id asc
	limit 1;

	select t."path" 
	from liminal.radioqueue r
	join liminal.track t on
	r.track_id =t.id 
	into trackpath
	where r.id = radioqueueid;

	update liminal.radioqueue
	set cycle=cycle+1
	where id=radioqueueid;

	return trackpath;

END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getradioqueue()
 RETURNS TABLE(id integer, trackid integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN 
	RETURN QUERY SELECT r.id, t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		join liminal.radioqueue r on t.id =r.track_id
	order by r.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.gettrack(tid integer)
 RETURNS TABLE(id integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT t.id, t."path",	t."name", t.cover, to_char(t.duration,'MI:SS') as "duration", a."name" , g."name" FROM liminal.track t
	join liminal.author a on t.author_id = a.id 
	join liminal.genre g on t.genre_id = g.id 
	WHERE t.id = tid;
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.gettracklist()
 RETURNS TABLE(id integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		order by t.id; 
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.gettracklist(ttrackname character varying DEFAULT NULL::character varying, tnickname character varying DEFAULT NULL::character varying)
 RETURNS TABLE(id integer, path character varying, name character varying, cover character varying, duration text, author character varying, genre character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
  
	if ttrackname is null then 
	RETURN QUERY SELECT t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		WHERE lower(a.nickname) ilike '%'||tnickname||'%' 
		order by t.id;
	
	elseif tnickname is null then 
	RETURN QUERY SELECT t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		WHERE lower(t."name") ilike '%'||ttrackname||'%'
		order by t.id;
	else 
	RETURN QUERY SELECT t.id, t."path", t."name", t.cover, 
	    to_char(t.duration,'MI:SS') as "duration", 
		a.nickname as "author", g.name as "genre" 
		FROM liminal.track t 
		JOIN liminal.author a ON t.author_id=a.id 
		JOIN liminal.genre g ON t.genre_id=g.id 
		WHERE lower(a.nickname) ilike '%'||tnickname||'%' 
		or lower(t."name") ilike '%'||ttrackname||'%'
		order by t.id;
  end if;  
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getuser(tid integer, temail character varying)
 RETURNS TABLE(id integer, last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying, isadmin boolean)
 LANGUAGE plpgsql
AS $function$
begin
    RETURN QUERY SELECT u.id, u.last_name, u.first_name, u.middle_name, 
    to_char(u.birth_date,'DD.MM.YYYY') as "birth_date", 
    u.subscribed, u.email, u.phone, u.avatar, u.isAdmin
	FROM liminal.user u
	where u.id=tid and u.email = temail;
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getuser(tid integer)
 RETURNS TABLE(id integer, last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying, isadmin boolean)
 LANGUAGE plpgsql
AS $function$
begin
    RETURN QUERY SELECT u.id, u.last_name, u.first_name, u.middle_name, 
    to_char(u.birth_date,'DD.MM.YYYY') as "birth_date", 
    u.subscribed, u.email, u.phone, u.avatar, u.isAdmin
	FROM liminal.user u
	where u.id=tid;
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getusercreds(temail character varying)
 RETURNS TABLE(id integer, hash text)
 LANGUAGE plpgsql
AS $function$
begin
    RETURN QUERY SELECT l.id ,l.hash 
	FROM liminal.login l
	where l.email = temail;
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getuserlist()
 RETURNS TABLE(id integer, last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying, isadmin boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY SELECT u.id, u.last_name, u.first_name, u.middle_name, to_char(u.birth_date,'DD.MM.YYYY') as "birth_date", u.subscribed, u.email, u.phone, u.avatar, u.isadmin
		FROM liminal.user u
		order by u.id; 
END;
$function$
;

CREATE OR REPLACE FUNCTION liminal.getuserlist(ttype character varying, query character varying)
 RETURNS TABLE(id integer, last_name character varying, first_name character varying, middle_name character varying, birth_date text, subscribed boolean, email character varying, phone character varying, avatar character varying, isadmin boolean)
 LANGUAGE plpgsql
AS $function$
begin
	
	case ttype
		when 'all' then
			RETURN QUERY SELECT u.id, u.last_name, u.first_name, 
								u.middle_name, 
								to_char(u.birth_date,'DD.MM.YYYY') as "birth_date",
								u.subscribed, u.email, u.phone, 
								u.avatar, u.isadmin
				FROM liminal.user u
				WHERE lower(u.last_name) ilike '%'||query||'%' 
				or lower(u.first_name) ilike '%'||query||'%' 
				or lower(u.email) ilike '%'||query||'%' 
				or lower(u.phone) ilike '%'||query||'%' 
				order by u.id; 
		when 'regular' then
			RETURN QUERY SELECT u.id, u.last_name, u.first_name, 
								u.middle_name, 
								to_char(u.birth_date,'DD.MM.YYYY') as "birth_date",
								u.subscribed, u.email, u.phone, 
								u.avatar, u.isadmin
				FROM liminal.user u
				WHERE u.isadmin = false 
				and
				(lower(u.last_name) ilike '%'||query||'%' 
				or lower(u.first_name) ilike '%'||query||'%' 
				or lower(u.email) ilike '%'||query||'%' 
				or lower(u.phone) ilike '%'||query||'%') 
				order by u.id; 
		when 'admin' then
			RETURN QUERY SELECT u.id, u.last_name, u.first_name, 
								u.middle_name, 
								to_char(u.birth_date,'DD.MM.YYYY') as "birth_date",
								u.subscribed, u.email, u.phone, 
								u.avatar, u.isadmin
				FROM liminal.user u
				WHERE u.isadmin = true 
				and
				(lower(u.last_name) ilike '%'||query||'%' 
				or lower(u.first_name) ilike '%'||query||'%' 
				or lower(u.email) ilike '%'||query||'%' 
				or lower(u.phone) ilike '%'||query||'%') 
				order by u.id; 
		else 
			raise 'Wrong type';
		end case;
	
END;
$function$
;

CREATE OR REPLACE PROCEDURE liminal.register(last_name character varying, first_name character varying, birth_date date, email character varying, phone character varying, avatar character varying, hash text)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
   l_id integer;
BEGIN
	INSERT INTO liminal.login(email, hash)
	VALUES (email, hash)
	RETURNING id INTO l_id;

	insert into liminal.user(id,last_name,first_name,birth_date,email,phone,avatar)
	values (l_id,last_name,first_name,birth_date,email,phone,avatar);
end;
$procedure$
;

CREATE OR REPLACE FUNCTION liminal.selectqueuecycle()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
begin
    RETURN (SELECT max(r."cycle")-1 
	FROM liminal.radioqueue r);
END;
$function$
;
