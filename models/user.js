'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Users.belongsToMany(models.Course, {
      //   through: 'CourseUser',
      //   as: 'courses',
      //   foreignKey: 'user_id',
      //   otherKey: 'course_id'
      // });
      // Users.hasMany(models.List, {
      //   as: 'lists',
      //   foreignKey: 'user_id'
      // });
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "pursuit"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};