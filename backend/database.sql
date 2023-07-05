-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Structure de la table `builders`
--

DROP TABLE IF EXISTS `builders`;
CREATE TABLE IF NOT EXISTS `builders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` int NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_country_family` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Blindés'),
(2, 'Avions'),
(3, 'Véhicules'),
(4, 'Navires'),
(5, 'Hélicoptères');

-- Structure de la table `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `country` (`id`, `name`) VALUES
(1, 'France'),
(2, 'Allemagne'),
(3, 'U.S.A'),
(4, 'URSS'),
(5, 'Japon'),
(6, 'Angleterre');


DROP TABLE IF EXISTS `friend`;
CREATE TABLE IF NOT EXISTS `friend` (
  `id_friend1` int NOT NULL,
  `id_friend2` int NOT NULL,
  `is_ok` SMALLINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_friend1`,`id_friend2`),
  KEY `id2_friend` (`id_friend2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `builder` int NOT NULL,
  `category` int NOT NULL,
  `brand` int NOT NULL,
  `period` int NOT NULL,
  `scale` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `reference` varchar(30) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `scalemates` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_brand_model` (`brand`),
  KEY `c_category_model` (`category`),
  KEY `c_family_model` (`builder`),
  KEY `c_period_model` (`period`),
  KEY `c_scale_model` (`scale`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Structure de la table `model_order`
--

DROP TABLE IF EXISTS `model_order`;
CREATE TABLE IF NOT EXISTS `model_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `qtte` int NOT NULL,
  `price` double UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_order` (`model_id`),
  KEY `oder_order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Structure de la table `model_user`
--

DROP TABLE IF EXISTS `model_user`;
CREATE TABLE IF NOT EXISTS `model_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `model` int NOT NULL,
  `state` int NOT NULL,
  `provider` int DEFAULT NULL,
  `pictures` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_model_owner` (`owner`),
  KEY `c_model_state` (`state`),
  KEY `c_model_model` (`model`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `owner` int NOT NULL,
  `provider` int NOT NULL,
  `reference` varchar(50) NOT NULL,
  `dateOrder` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`reference`),
  KEY `c_order_owner` (`owner`),
  KEY `c_order_provider` (`provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Structure de la table `period`
--

DROP TABLE IF EXISTS `period`;
CREATE TABLE IF NOT EXISTS `period` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `period`
--

INSERT INTO `period` (`id`, `name`) VALUES
(1, 'WWI'),
(2, 'WWII'),
(3, 'Vietnam'),
(4, 'Entre guerres'),
(5, 'Moderne');

--
-- Structure de la table `provider`
--

DROP TABLE IF EXISTS `provider`;
CREATE TABLE IF NOT EXISTS `provider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_user_provider` (`owner`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Structure de la table `scale`
--

DROP TABLE IF EXISTS `scale`;
CREATE TABLE IF NOT EXISTS `scale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `scale` (`id`, `name`) VALUES
(1, '1/72'),
(2, '1/48'),
(3, '1/24'),
(4, '1/32'),
(5, '1/35');

--
-- Structure de la table `state`
--

DROP TABLE IF EXISTS `state`;
CREATE TABLE IF NOT EXISTS `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `state`
--

INSERT INTO `state` (`id`, `name`) VALUES
(1, 'En stock'),
(2, 'En cours'),
(3, 'Terminé'),
(4, 'Liste de souhaits'),
(5, 'Commandé');

-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rankUser` int NOT NULL DEFAULT '1',
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `login` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `isVisible` BOOLEAN NOT NULL DEFAULT FALSE,
  `pwdtoken` VARCHAR(255) NULL,
  `avatar` VARCHAR(255) NULL,
  `allow` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Structure de la vue `all_info_model`
--
DROP TABLE IF EXISTS `all_info_model`;

DROP VIEW IF EXISTS `all_info_model`;
CREATE  VIEW `all_info_model`  AS SELECT `mu`.`id` AS `id`, `mu`.`model` AS `model`, `mu`.`provider` AS `provider`, `mu`.`pictures` AS `pictures`, `mu`.`price` AS `price`, `mu`.`owner` AS `owner`, `mu`.`state` AS `state`, `m`.`name` AS `modelName`, `m`.`picture` AS `picture`, `m`.`reference` AS `reference`, `m`.`scalemates` AS `scalemates`, `b`.`name` AS `brandName`, `p`.`name` AS `periodName`, `s`.`name` AS `scaleName`, `bu`.`name` AS `builderName`, `c`.`name` AS `categoryName`, `pr`.`name` AS `providerName` FROM (((((((`model_user` `mu` join `model` `m` on((`mu`.`model` = `m`.`id`))) join `brand` `b` on((`m`.`brand` = `b`.`id`))) join `period` `p` on((`m`.`period` = `p`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `category` `c` on((`m`.`category` = `c`.`id`))) left join `provider` `pr` on((`mu`.`provider` = `pr`.`id`)))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `model_favorite`
--
DROP TABLE IF EXISTS `model_favorite`;

DROP VIEW IF EXISTS `model_favorite`;
CREATE  VIEW `model_favorite`  AS SELECT `mu`.`id` AS `id`, `mu`.`owner` AS `owner`, `mu`.`model` AS `model`, `m`.`name` AS `modelName`, `b`.`name` AS `brandName`, `bu`.`name` AS `builderName`, `s`.`name` AS `scaleName` FROM ((((`model_user` `mu` join `model` `m` on((`mu`.`model` = `m`.`id`))) join `brand` `b` on((`m`.`brand` = `b`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) WHERE (`mu`.`state` = 4)  ;

-- --------------------------------------------------------

--
-- Structure de la vue `model_full`
--
DROP TABLE IF EXISTS `model_full`;

DROP VIEW IF EXISTS `model_full`;
CREATE  VIEW `model_full`  AS SELECT `m`.`id` AS `id`, `m`.`name` AS `name`, `m`.`builder` AS `builder`, `m`.`category` AS `category`, `m`.`brand` AS `brand`, `m`.`period` AS `period`, `m`.`scale` AS `scale`, `m`.`reference` AS `reference`, `m`.`picture` AS `picture`, `m`.`scalemates` AS `scalemates`, `bu`.`name` AS `buildername`, `bu`.`country` AS `countryid`, `c`.`name` AS `categoryname`, `br`.`name` AS `brandname`, `p`.`name` AS `periodname`, `s`.`name` AS `scalename`, `co`.`name` AS `countryname` FROM ((((((`model` `m` join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `category` `c` on((`m`.`category` = `c`.`id`))) join `brand` `br` on((`m`.`brand` = `br`.`id`))) join `period` `p` on((`m`.`period` = `p`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) join `country` `co` on((`bu`.`country` = `co`.`id`)))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `mymodels`
--
DROP TABLE IF EXISTS `mymodels`;

DROP VIEW IF EXISTS `mymodels`;
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

ALTER TABLE `builders`
  ADD CONSTRAINT `c_country_family` FOREIGN KEY (`country`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `id1_friend` FOREIGN KEY (`id_friend1`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id2_friend` FOREIGN KEY (`id_friend2`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `c_brand_model` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_category_model` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_family_model` FOREIGN KEY (`builder`) REFERENCES `builders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_period_model` FOREIGN KEY (`period`) REFERENCES `period` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_scale_model` FOREIGN KEY (`scale`) REFERENCES `scale` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `model_order`
--
ALTER TABLE `model_order`
  ADD CONSTRAINT `model_order` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `oder_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`reference`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `model_user`
--
ALTER TABLE `model_user`
  ADD CONSTRAINT `c_model_model` FOREIGN KEY (`model`) REFERENCES `model` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_model_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_model_state` FOREIGN KEY (`state`) REFERENCES `state` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `c_order_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_order_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `provider`
--
ALTER TABLE `provider`
  ADD CONSTRAINT `c_user_provider` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE model_message (`id` INT NOT NULL AUTO_INCREMENT , `fk_model` INT NOT NULL , `fk_author` INT NOT NULL , `date_message` DATE NOT NULL , `message` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `model_message` ADD CONSTRAINT `c_model_com` FOREIGN KEY (`fk_model`) REFERENCES `model_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `model_message` ADD CONSTRAINT `c_author_com` FOREIGN KEY (`fk_author`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;