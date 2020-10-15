import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'
import { getAllGroups } from '../../businessLogic/groups'
//import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'


const app = express()
const server = awsServerlessExpress.createServer(app)
//app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/groups', async (req, res) => {

    const groups = await getAllGroups()

    console.log('Request: ', req)
    console.log('Resp (whatś this?): ', res)
    console.log('Retrieved Groups:', groups)

    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            items: groups
        })
    }
})
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
