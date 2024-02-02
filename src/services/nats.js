import {connect} from 'nats'

const connectionParams = {servers: process.env.NATS_SERVER}

async function connection() {
	const nats = connect(connectionParams)

	return nats
}

const nats = connection()

nats.then(nats => {
	console.log(`Nats: connected to ${nats.getServer()}`)
}).catch(e => {
	console.log(e)
})

export default nats
