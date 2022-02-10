{
    const { Sequelize, DataTypes, Deferrable  } = require('sequelize');  
    const { sequelize } = require('../Config/sequilize');
    const Category = require('./category');
  
      const Todo = sequelize.define('Todo', {
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          }
        }, {
          // options
          paranoid: true,  // For soft delete
        });

        // Define the relationship  (one to many)
        Category.hasMany(Todo);  // Todo model will have foreign key i.e, categoryId with this syntax
        Todo.belongsTo(Category, { foreignKey: 'category_id' });
        
      
      module.exports = Todo;
  }