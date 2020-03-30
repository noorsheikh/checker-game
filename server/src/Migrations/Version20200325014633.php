<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200325014633 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE game_moves (id INT AUTO_INCREMENT NOT NULL, game_id INT NOT NULL, player_id INT NOT NULL, state VARCHAR(64) NOT NULL, INDEX IDX_770C71BDE48FD905 (game_id), INDEX IDX_770C71BD99E6F5DF (player_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE games (id INT AUTO_INCREMENT NOT NULL, status_id INT NOT NULL, state VARCHAR(64) NOT NULL, timestamp DATETIME NOT NULL, INDEX IDX_FF232B316BF700BD (status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_status (id INT AUTO_INCREMENT NOT NULL, status VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_users (id INT AUTO_INCREMENT NOT NULL, game_id INT NOT NULL, player1_id INT DEFAULT NULL, player2_id INT DEFAULT NULL, winner_id INT DEFAULT NULL, INDEX IDX_26B0DC66E48FD905 (game_id), INDEX IDX_26B0DC66C0990423 (player1_id), INDEX IDX_26B0DC66D22CABCD (player2_id), INDEX IDX_26B0DC665DFCD4B8 (winner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, status_id INT NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, INDEX IDX_8D93D6496BF700BD (status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_status (id INT AUTO_INCREMENT NOT NULL, status VARCHAR(20) NOT NULL, timestamp DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE game_moves ADD CONSTRAINT FK_770C71BDE48FD905 FOREIGN KEY (game_id) REFERENCES games (id)');
        $this->addSql('ALTER TABLE game_moves ADD CONSTRAINT FK_770C71BD99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE games ADD CONSTRAINT FK_FF232B316BF700BD FOREIGN KEY (status_id) REFERENCES game_status (id)');
        $this->addSql('ALTER TABLE game_users ADD CONSTRAINT FK_26B0DC66E48FD905 FOREIGN KEY (game_id) REFERENCES games (id)');
        $this->addSql('ALTER TABLE game_users ADD CONSTRAINT FK_26B0DC66C0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game_users ADD CONSTRAINT FK_26B0DC66D22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game_users ADD CONSTRAINT FK_26B0DC665DFCD4B8 FOREIGN KEY (winner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6496BF700BD FOREIGN KEY (status_id) REFERENCES user_status (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE game_moves DROP FOREIGN KEY FK_770C71BDE48FD905');
        $this->addSql('ALTER TABLE game_users DROP FOREIGN KEY FK_26B0DC66E48FD905');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_FF232B316BF700BD');
        $this->addSql('ALTER TABLE game_moves DROP FOREIGN KEY FK_770C71BD99E6F5DF');
        $this->addSql('ALTER TABLE game_users DROP FOREIGN KEY FK_26B0DC66C0990423');
        $this->addSql('ALTER TABLE game_users DROP FOREIGN KEY FK_26B0DC66D22CABCD');
        $this->addSql('ALTER TABLE game_users DROP FOREIGN KEY FK_26B0DC665DFCD4B8');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6496BF700BD');
        $this->addSql('DROP TABLE game_moves');
        $this->addSql('DROP TABLE games');
        $this->addSql('DROP TABLE game_status');
        $this->addSql('DROP TABLE game_users');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_status');
    }
}
