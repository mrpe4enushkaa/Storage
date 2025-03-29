CREATE TABLE IF NOT EXISTS `users` (
    `id_user` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(31) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id_user`)
);