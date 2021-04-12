module.exports = (sequelize, type) => {
	return sequelize.define('videos', {
		youtube_id: type.STRING,
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		requests: type.INTEGER,
		title: type.STRING,
		format: type.STRING
	})
}
