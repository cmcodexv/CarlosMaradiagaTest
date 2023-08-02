-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `carlostestdb`;
CREATE DATABASE `carlostestdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carlostestdb`;

CREATE TABLE `efectividad` (
  `efectividadId` int NOT NULL AUTO_INCREMENT,
  `tipoAtaque` int NOT NULL,
  `tipoDefensa` int NOT NULL,
  `significado` varchar(30) NOT NULL,
  `resultado` float NOT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificaion` date DEFAULT NULL,
  PRIMARY KEY (`efectividadId`),
  KEY `tipoAtaque` (`tipoAtaque`),
  KEY `tipoDefensa` (`tipoDefensa`),
  CONSTRAINT `efectividad_ibfk_1` FOREIGN KEY (`tipoAtaque`) REFERENCES `tipo` (`tipoId`),
  CONSTRAINT `efectividad_ibfk_2` FOREIGN KEY (`tipoDefensa`) REFERENCES `tipo` (`tipoId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `efectividad` (`efectividadId`, `tipoAtaque`, `tipoDefensa`, `significado`, `resultado`, `activo`, `fechaCreacion`, `fechaModificaion`) VALUES
(1,	2,	1,	'debilidad',	2,	1,	'2023-07-31',	'2023-07-31'),
(2,	4,	1,	'debilidad',	2,	1,	'2023-07-31',	'2023-07-31'),
(3,	1,	2,	'resistencia',	0.5,	1,	'2023-07-31',	'2023-07-31'),
(4,	1,	4,	'normal',	1,	1,	'2023-07-31',	'2023-07-31');

CREATE TABLE `movimiento` (
  `movimientoId` int NOT NULL AUTO_INCREMENT,
  `tipoId` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `categoria` varchar(30) DEFAULT NULL,
  `poder` int DEFAULT NULL,
  `acc` int DEFAULT NULL,
  `pp` int DEFAULT NULL,
  `efecto` varchar(255) DEFAULT NULL,
  `probabilidad` int DEFAULT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificacion` date DEFAULT NULL,
  PRIMARY KEY (`movimientoId`),
  KEY `tipoId` (`tipoId`),
  CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`tipoId`) REFERENCES `tipo` (`tipoId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `movimiento` (`movimientoId`, `tipoId`, `nombre`, `categoria`, `poder`, `acc`, `pp`, `efecto`, `probabilidad`, `activo`, `fechaCreacion`, `fechaModificacion`) VALUES
(1,	2,	'Bubble',	'Special',	40,	100,	30,	'May lower opponent\'s Speed.',	10,	1,	'2023-07-31',	'2023-07-31'),
(2,	1,	'Burn Up',	'Special',	130,	100,	5,	'To inflict massive damage, the user burns itself out. After using this move, the user will no longer be Fire type.',	NULL,	1,	'2023-07-31',	'2023-07-31'),
(3,	4,	'Beat Up',	'Physical',	NULL,	100,	10,	'Each Pokémon in user\'s party attacks.',	NULL,	1,	'2023-07-31',	'2023-08-01'),
(4,	4,	'Postman9',	'Test',	1,	7,	3,	'Prueba3',	5,	1,	'2023-07-31',	'2023-08-01'),
(5,	4,	'Test',	'Test',	1,	2,	3,	'Prueba',	0,	1,	'2023-08-01',	'2023-08-01'),
(6,	4,	'testModPos2',	'SpecialMod',	1,	2,	3,	'Prueba',	6,	1,	'2023-08-01',	'2023-08-01');

CREATE TABLE `pokemon` (
  `pokemonId` int NOT NULL AUTO_INCREMENT,
  `nivel` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `saludActual` int NOT NULL,
  `saludTotal` int NOT NULL,
  `ataqueBase` int NOT NULL,
  `defensaBase` int NOT NULL,
  `ataqueEspecial` int NOT NULL,
  `defensaEspecial` int NOT NULL,
  `velocidad` int NOT NULL,
  `base` tinyint NOT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificacion` date DEFAULT NULL,
  PRIMARY KEY (`pokemonId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `pokemon` (`pokemonId`, `nivel`, `nombre`, `saludActual`, `saludTotal`, `ataqueBase`, `defensaBase`, `ataqueEspecial`, `defensaEspecial`, `velocidad`, `base`, `activo`, `fechaCreacion`, `fechaModificacion`) VALUES
(1,	6,	'Greninja',	72,	640,	145,	67,	153,	71,	132,	0,	1,	'2023-07-31',	'2023-07-31'),
(2,	8,	'Charmander',	39,	309,	52,	43,	60,	50,	65,	0,	1,	'2023-07-31',	'2023-07-31'),
(3,	1,	'PokemonEdit',	2,	3,	4,	5,	6,	7,	8,	1,	1,	'2023-08-01',	'2023-08-02'),
(4,	7,	'PokemonBased',	2,	10,	3,	4,	5,	8,	6,	1,	1,	'2023-08-01',	'2023-08-02');

CREATE TABLE `pokemonMovimiento` (
  `pokemonMovimientoId` int NOT NULL AUTO_INCREMENT,
  `pokemonId` int NOT NULL,
  `movimientoId` int NOT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificaion` date DEFAULT NULL,
  PRIMARY KEY (`pokemonMovimientoId`),
  KEY `pokemonId` (`pokemonId`),
  KEY `movimientoId` (`movimientoId`),
  CONSTRAINT `pokemonMovimiento_ibfk_1` FOREIGN KEY (`pokemonId`) REFERENCES `pokemon` (`pokemonId`),
  CONSTRAINT `pokemonMovimiento_ibfk_2` FOREIGN KEY (`movimientoId`) REFERENCES `movimiento` (`movimientoId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `pokemonMovimiento` (`pokemonMovimientoId`, `pokemonId`, `movimientoId`, `activo`, `fechaCreacion`, `fechaModificaion`) VALUES
(1,	1,	1,	1,	'2023-07-31',	'2023-07-31'),
(2,	1,	3,	1,	'2023-07-31',	'2023-07-31'),
(3,	2,	2,	1,	'2023-07-31',	'2023-07-31');

CREATE TABLE `pokemonTipo` (
  `pokemonTipoId` int NOT NULL AUTO_INCREMENT,
  `pokemonId` int NOT NULL,
  `tipoId` int NOT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificacion` date DEFAULT NULL,
  PRIMARY KEY (`pokemonTipoId`),
  KEY `pokemonId` (`pokemonId`),
  KEY `tipoId` (`tipoId`),
  CONSTRAINT `pokemonTipo_ibfk_1` FOREIGN KEY (`pokemonId`) REFERENCES `pokemon` (`pokemonId`),
  CONSTRAINT `pokemonTipo_ibfk_2` FOREIGN KEY (`tipoId`) REFERENCES `tipo` (`tipoId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `pokemonTipo` (`pokemonTipoId`, `pokemonId`, `tipoId`, `activo`, `fechaCreacion`, `fechaModificacion`) VALUES
(1,	1,	2,	1,	'2023-07-31',	'2023-07-31'),
(2,	1,	4,	1,	'2023-07-31',	'2023-07-31'),
(3,	2,	1,	1,	'2023-07-31',	'2023-07-31');

CREATE TABLE `tipo` (
  `tipoId` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `activo` tinyint NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaModificacion` date DEFAULT NULL,
  PRIMARY KEY (`tipoId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tipo` (`tipoId`, `nombre`, `activo`, `fechaCreacion`, `fechaModificacion`) VALUES
(1,	'FIRE',	1,	'2023-07-31',	'2023-07-31'),
(2,	'WATER',	1,	'2023-07-31',	'2023-07-31'),
(3,	'GROUND',	0,	'2023-07-31',	'2023-08-01'),
(4,	'DARK',	1,	'2023-07-31',	'2023-08-01'),
(5,	'ROCK',	1,	'2023-07-31',	'2023-07-31'),
(6,	'Prueba',	1,	'2023-08-01',	'2023-08-01'),
(7,	'TestSave',	1,	'2023-08-01',	NULL);

-- 2023-08-02 09:10:30
