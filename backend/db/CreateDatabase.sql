CREATE DATABASE vote_system;

DROP TABLE IF EXISTS perguntas;

CREATE TABLE perguntas (
	id INT PRIMARY KEY AUTO_INCREMENT,
  pergunta VARCHAR(255) NOT NULL,
  data_inicial DATE NOT NULL,
  data_final DATE NOT NULL,
  status_pergunta VARCHAR(100)
);

DROP TABLE IF EXISTS respostas;

CREATE TABLE respostas (
	id INT PRIMARY KEY AUTO_INCREMENT,
  id_pergunta INT NOT NULL,
  resposta VARCHAR(255) NOT NULL,
  qtd_votos INT DEFAULT 0,
  FOREIGN KEY (id_pergunta) REFERENCES perguntas(id)
);