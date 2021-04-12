const Sequelize = require('sequelize');
const videosModel = require('./db_models/videos');
const sequelize = new Sequelize(
	process.env.AURORA_NAME,
	process.env.AURORA_USER,
	process.env.AURORA_PASSWORD,
	{
		dialect: 'mysql',
		dialectOptions: {
			connectTimeout: 60000
		},
		define: {
		    freezeTableName: true
		},
		pool: {
			max: 10,
			min: 0,
			acquire: 12000,
			idle: 12000,
			evict: 12000
		},
		operatorAliases: false,
		host: process.env.AURORA_HOST,
		port: process.env.AURORA_PORT
	}
)
// check if given database exists, or create it
sequelize.query("CREATE DATABASE IF NOT EXISTS "+process.env.AURORA_NAME).then(function() {
});
const videos = videosModel(sequelize, Sequelize)
const Models = { videos }
const connection = {}

module.exports = async () => {
	if (connection.isConnected) {
		console.log('=> Using existing connection.')
		return Models
	}

	await sequelize.sync({ alter:false })
	await sequelize.authenticate()
	connection.isConnected = true
	console.log('=> Created a new connection.')
	return Models
}
