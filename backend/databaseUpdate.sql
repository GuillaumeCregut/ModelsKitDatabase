/* Update to V1.2 */

DROP VIEW IF EXISTS `mymodels`;
CREATE  VIEW mymodels  AS 
SELECT mu.id AS id, mu.model AS idModel, mu.state AS state, mu.pictures AS pictures,mu.price ,mu.owner AS owner, s.name AS stateName, m.name AS modelName, m.reference AS reference, m.picture AS boxPicture, bu.name AS builderName, st.name AS scaleName, br.name AS brandName,p.name as providerName 
FROM
model_user mu inner join state s on mu.state = s.id
 inner join model m on mu.model = m.id 
 inner join builders bu on m.builder = bu.id 
 inner join scale st on m.scale = st.id 
 inner join brand br on m.brand = br.id
 left join provider p ON mu.provider=p.id;

 ALTER TABLE `orders` ADD `dateOrder` DATE NULL DEFAULT NULL AFTER `reference`;

 ALTER TABLE `user` ADD `isVisible` BOOLEAN NOT NULL DEFAULT FALSE AFTER `refreshToken`;

 ALTER TABLE `user` ADD `pwdtoken` VARCHAR(255) NULL AFTER `isVisible`;

 ALTER TABLE `user` ADD `avatar` VARCHAR(255) NULL AFTER `pwdtoken`;
CREATE TABLE model_message (`id` INT NOT NULL AUTO_INCREMENT , `fk_model` INT NOT NULL , `fk_author` INT NOT NULL , `date_message` DATE NOT NULL , `message` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `model_message` ADD CONSTRAINT `c_model_com` FOREIGN KEY (`fk_model`) REFERENCES `model_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `model_message` ADD CONSTRAINT `c_author_com` FOREIGN KEY (`fk_author`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;