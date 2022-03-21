'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.belongsToMany(models.Lists, { through: "ListMovies", /* options */ })
    }
  }
  Movies.init({
    title: DataTypes.STRING,
    release_date: DataTypes.STRING,
    runtime: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
    tmdbId: DataTypes.INTEGER,
    rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};