'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    otherPublicField
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.belongsToMany(models.Lists, { 
        through: "ListMovies",
        as: "lists" 
      })
    }
  }
  Movies.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    title: DataTypes.STRING,
    release_date: DataTypes.STRING,
    runtime: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
    // rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};