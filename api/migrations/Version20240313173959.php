<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240313173959 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE greeting_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE cocktail_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ingredient_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE step_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE utensil_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(100) NOT NULL, resume VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE cocktail (id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(100) NOT NULL, resume VARCHAR(255) NOT NULL, img_path VARCHAR(255) NOT NULL, etat BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7B4914D4A76ED395 ON cocktail (user_id)');
        $this->addSql('CREATE TABLE cocktail_utensil (cocktail_id INT NOT NULL, utensil_id INT NOT NULL, PRIMARY KEY(cocktail_id, utensil_id))');
        $this->addSql('CREATE INDEX IDX_5CF39780CD6F76C6 ON cocktail_utensil (cocktail_id)');
        $this->addSql('CREATE INDEX IDX_5CF39780EC4313DE ON cocktail_utensil (utensil_id)');
        $this->addSql('CREATE TABLE cocktail_ingredient (cocktail_id INT NOT NULL, ingredient_id INT NOT NULL, PRIMARY KEY(cocktail_id, ingredient_id))');
        $this->addSql('CREATE INDEX IDX_1A2C0A39CD6F76C6 ON cocktail_ingredient (cocktail_id)');
        $this->addSql('CREATE INDEX IDX_1A2C0A39933FE08C ON cocktail_ingredient (ingredient_id)');
        $this->addSql('CREATE TABLE cocktail_category (cocktail_id INT NOT NULL, category_id INT NOT NULL, PRIMARY KEY(cocktail_id, category_id))');
        $this->addSql('CREATE INDEX IDX_29E0BEEDCD6F76C6 ON cocktail_category (cocktail_id)');
        $this->addSql('CREATE INDEX IDX_29E0BEED12469DE2 ON cocktail_category (category_id)');
        $this->addSql('CREATE TABLE ingredient (id INT NOT NULL, name VARCHAR(100) NOT NULL, img_path VARCHAR(255) NOT NULL, unite VARCHAR(100) NOT NULL, volume VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, cocktail_id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(100) NOT NULL, resume VARCHAR(255) NOT NULL, note INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_794381C6CD6F76C6 ON review (cocktail_id)');
        $this->addSql('CREATE INDEX IDX_794381C6A76ED395 ON review (user_id)');
        $this->addSql('CREATE TABLE step (id INT NOT NULL, cocktail_id INT NOT NULL, sequence INT NOT NULL, resume VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_43B9FE3CCD6F76C6 ON step (cocktail_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(50) NOT NULL, first_name VARCHAR(100) DEFAULT NULL, last_name VARCHAR(100) DEFAULT NULL, city VARCHAR(100) DEFAULT NULL, country VARCHAR(100) DEFAULT NULL, name_bar VARCHAR(255) DEFAULT NULL, bio VARCHAR(255) DEFAULT NULL, date_birthday DATE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON "user" (email)');
        $this->addSql('CREATE TABLE utensil (id INT NOT NULL, name VARCHAR(100) NOT NULL, img_path VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE cocktail ADD CONSTRAINT FK_7B4914D4A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_utensil ADD CONSTRAINT FK_5CF39780CD6F76C6 FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_utensil ADD CONSTRAINT FK_5CF39780EC4313DE FOREIGN KEY (utensil_id) REFERENCES utensil (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_ingredient ADD CONSTRAINT FK_1A2C0A39CD6F76C6 FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_ingredient ADD CONSTRAINT FK_1A2C0A39933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_category ADD CONSTRAINT FK_29E0BEEDCD6F76C6 FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cocktail_category ADD CONSTRAINT FK_29E0BEED12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6CD6F76C6 FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE step ADD CONSTRAINT FK_43B9FE3CCD6F76C6 FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE greeting');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE cocktail_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ingredient_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE step_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE utensil_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE greeting_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE greeting (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE cocktail DROP CONSTRAINT FK_7B4914D4A76ED395');
        $this->addSql('ALTER TABLE cocktail_utensil DROP CONSTRAINT FK_5CF39780CD6F76C6');
        $this->addSql('ALTER TABLE cocktail_utensil DROP CONSTRAINT FK_5CF39780EC4313DE');
        $this->addSql('ALTER TABLE cocktail_ingredient DROP CONSTRAINT FK_1A2C0A39CD6F76C6');
        $this->addSql('ALTER TABLE cocktail_ingredient DROP CONSTRAINT FK_1A2C0A39933FE08C');
        $this->addSql('ALTER TABLE cocktail_category DROP CONSTRAINT FK_29E0BEEDCD6F76C6');
        $this->addSql('ALTER TABLE cocktail_category DROP CONSTRAINT FK_29E0BEED12469DE2');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C6CD6F76C6');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C6A76ED395');
        $this->addSql('ALTER TABLE step DROP CONSTRAINT FK_43B9FE3CCD6F76C6');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE cocktail');
        $this->addSql('DROP TABLE cocktail_utensil');
        $this->addSql('DROP TABLE cocktail_ingredient');
        $this->addSql('DROP TABLE cocktail_category');
        $this->addSql('DROP TABLE ingredient');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE step');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE utensil');
    }
}
