'use strict';
module.exports = function (sequelize, DataTypes) {
    const Photo = sequelize.define('Photo', {
        originalImage: DataTypes.STRING,
        postImage: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
    }, {
        timestamps: false,
    });

    Photo.associate = function (models) {
        Photo.belongsTo(models.Post);
        Photo.belongsToMany(models.Tag, {through: 'PhotoTags', timestamps: false});
    };
    return Photo;
};