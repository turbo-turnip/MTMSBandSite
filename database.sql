-- PostgreSQL database for MTMSBandSite

CREATE DATABASE mtmsbandsite;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	user_pass VARCHAR(255) NOT NULL
);

CREATE TABLE times (
	time_id SERIAL PRIMARY KEY,
	time INT NOT NULL,
	instrument VARCHAR(30) NOT NULL,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE newsletters (
	newsletter_id SERIAL PRIMARY KEY,
	date_created VARCHAR(10) NOT NULL,
	content VARCHAR(1000) NOT NULL
);

CREATE TABLE questions (
	question_id SERIAL PRIMARY KEY,
	question_from VARCHAR(255) NOT NULL,
	content VARCHAR(510) NOT NULL,
	replies VARCHAR(10000) NOT NULL
);

CREATE TABLE stats (
	stats_identifier INT,
	operating_systems VARCHAR(1000),
	web_browsers VARCHAR(1500),
	popular_browser VARCHAR(255),
	popular_operating_system VARCHAR(255)
);


SELECT * FROM users;
SELECT * FROM times ORDER BY time DESC;
SELECT * FROM newsletters ORDER BY date_created DESC;
SELECT * FROM questions ORDER BY question_id ASC;
SELECT * FROM stats;
