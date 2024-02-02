import {DataTypes} from 'sequelize'
import sequelize from '../connection'

const Grade = sequelize.define('grade', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	subject: {type: DataTypes.STRING, allowNull: false},
	grade: {type: DataTypes.INTEGER, allowNull: false},
	studentPersonalCode: {type: DataTypes.STRING, allowNull: false},
})

export default Grade
