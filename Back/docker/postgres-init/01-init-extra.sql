CREATE USER msbooks WITH PASSWORD '4m4d3u$t3$t';
CREATE DATABASE booksdb OWNER msbooks;

\connect booksdb
ALTER SCHEMA public OWNER TO msbooks;