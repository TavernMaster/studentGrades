import express from 'express'
import Grade from '../db/models/grade'
import {getStudent} from '../services/students'

const logRouter = express.Router()

logRouter.get('/', async (req, res) => {
	try {
		const {page = 1, limit = 10} = req.query
		const offset = page > 0 ? page - 1 : page
		const order = [['createdAt', 'ASC']]

		const grades = await Grade.findAll({limit, offset, order})

		const data = []

		for await (const gradeDb of grades) {
			const student = await getStudent(gradeDb.studentPersonalCode)

			data.push({
				date: gradeDb.createdAt,
				subject: gradeDb.subject,
				grade: gradeDb.grade,
				student,
			})
		}

		res.json(data)
	} catch (error) {
		res.status(400).json(error)
	}
})

export default logRouter
