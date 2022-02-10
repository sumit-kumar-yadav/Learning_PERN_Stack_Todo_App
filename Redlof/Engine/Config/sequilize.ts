{
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    });

    (async () => {
        try {
            await sequelize.authenticate();
            console.log('DB Connection has been established successfully.');
            // Create table if does not exist
            await sequelize.sync();
            // await sequelize.sync({ force: true });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    })()

    module.exports = {
        sequelize,
    };
}