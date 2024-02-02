import express from 'express'
import {getStudent} from '../services/students'
import getStatistic from '../services/statistic'

const statisticRouter = express.Router()

statisticRouter.get('/:personalCode', async (req, res) => {
	try {
		const {personalCode} = req.params
		if (!personalCode) throw new Error('personalCode is missing')

		const student = await getStudent(personalCode)
		const statistic = await getStatistic(personalCode)
		res.json({student, statistic})
	} catch (error) {
		res.status(400).json(error)
		console.log(error)
	}
})

export default statisticRouter
