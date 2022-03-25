'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lists.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id"
      })
      Lists.belongsToMany(models.Movies, { 
        through: "ListMovies",
        as: "movies" 
      })
    }
  }
  Lists.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lists',
  });
  return Lists;
};