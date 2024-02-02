import natsPromise from './nats'

export async function getStudent(personalCode) {
	try {
		const nats = await natsPromise
		const msgBuffer = await nats.request('students.v1.get', JSON.stringify({personalCode}))
		const msg = msgBuffer.json()
		const error = msg.error
		const data = msg.data

		if (error) throw new Error(`Nats request error. code: ${error.code}, message: ${error.message}`)

		return data
	} catch (error) {
		console.log(error)
	}
}
