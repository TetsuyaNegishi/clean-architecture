create table todo
(
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  checked BOOLEAN NOT NULL
);
