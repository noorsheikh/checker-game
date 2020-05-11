-- create checker_game database
CREATE DATABASE `checker_game`;

-- use checker_game database
USE `checker_game`;

-- create user table
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- create game table
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player1_id` int(11) NOT NULL,
  `player2_id` int(11) DEFAULT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `board_state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `player1_score` int(11) NOT NULL,
  `player2_score` int(11) NOT NULL,
  `game_status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `player_turn` int(11) NOT NULL,
  `game_locked` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_232B318CC0990423` (`player1_id`),
  KEY `IDX_232B318CD22CABCD` (`player2_id`),
  KEY `IDX_232B318C5DFCD4B8` (`winner_id`),
  CONSTRAINT `FK_232B318C5DFCD4B8` FOREIGN KEY (`winner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_232B318CC0990423` FOREIGN KEY (`player1_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_232B318CD22CABCD` FOREIGN KEY (`player2_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- create game move table
DROP TABLE IF EXISTS `game_move`;
CREATE TABLE `game_move` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `board_state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_42B5B54E48FD905` (`game_id`),
  KEY `IDX_42B5B5499E6F5DF` (`player_id`),
  CONSTRAINT `FK_42B5B5499E6F5DF` FOREIGN KEY (`player_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_42B5B54E48FD905` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- delete mysql root password
DELETE FROM mysql.user WHERE User='root';
FLUSH PRIVILEGES;

-- create new limited privileged mysql user with password and grant privileges
CREATE USER `cg-user`@`localhost` IDENTIFIED BY 'P@$$word@@.123';
GRANT ALL ON *.* TO 'cg-user'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `checker_game`.* TO `cg-user`@`localhost`;
GRANT DELETE ON `checker_game`.`game` TO `cg-user`@`localhost`;
FLUSH PRIVILEGES;
