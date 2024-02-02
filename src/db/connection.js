import {Sequelize} from 'sequelize'
const env = process.env.NODE_ENV || 'development'
import configs from '../config/database.json'
const config = configs[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {...config, logging: () => {}})

async function testConnection() {
	try {
		await sequelize.authenticate()
		console.log(`Database: connected to ${config.host}`)
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

testConnection()

export default sequelize
