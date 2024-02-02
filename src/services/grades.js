import Grade from '../db/models/grade'
import natsPromise from './nats'

export async function getGrades() {
	const nats = await natsPromise
	const sub = await nats.subscribe('students.v1.graded')
	console.log(`listening for ${sub.getSubject()} requests...`)
	for await (const m of sub) {
		try {
			const data = m.json().data
			if (!data) throw new Error('NATS: no reply data')
			await Grade.create({
				grade: data.grade,
				subject: data.subject,
				studentPersonalCode: data.personalCode,
			})
			console.log('Оценка записана в базу данных', data)
		} catch (error) {
			console.log(error)
		}
	}
}
