CREATE TABLE IF NOT EXISTS `users` (
    `ID_USER` INT NOT NULL AUTO_INCREMENT,
    `EMAIL` VARCHAR(255) NOT NULL,
    `USERNAME` VARCHAR(31) NOT NULL,
    `PASSWORD` VARCHAR(31) NOT NULL,
    PRIMARY KEY (`ID_USER`)
);