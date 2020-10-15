import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'
import { getAllGroups } from '../../businessLogic/groups'
//import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'


const app = express()
const server = awsServerlessExpress.createServer(app)
//app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/groups', async (req, res) => {

    const groups = await getAllGroups()

    console.log('Retrieved Groups:', groups)

   
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status('200')
    res.json({
        items: groups
      })
})
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
