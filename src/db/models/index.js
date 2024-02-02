import sequelize from '../connection'
import {Sequelize} from 'sequelize'

import Grade from './grade'

const db = {
	Sequelize,
	sequelize,
	Grade,
}

export default db
