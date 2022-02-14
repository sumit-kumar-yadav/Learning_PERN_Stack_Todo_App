{
    const { Sequelize, DataTypes } = require('sequelize');  
    const { sequelize } = require('../Config/sequilize');
    const Todo = require('./todo');
  
    const User = sequelize.define('User', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        // options
        paranoid: true,    // For soft delete
    });

    // Define the relationship  (one to many)
    User.hasMany(Todo);  // Todo model will have foreign key i.e, userId with this syntax
    Todo.belongsTo(User);
      
    module.exports = User;
  }