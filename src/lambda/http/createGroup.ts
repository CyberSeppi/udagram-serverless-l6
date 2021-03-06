import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreateGroupRequest } from '../../requests/CreateGroupRequest'
import { createGroup } from '../../businessLogic/groups'

import * as middy from 'middy'
import { warmup } from 'middy/middlewares'

//export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const newGroup: CreateGroupRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const newItem = await createGroup(newGroup, jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem
    })
  }
})

handler.use(
  warmup({
    isWarmingUp: event => event.source === 'serverless-plugin-warmup',
    onWarmup: event => event.return('Is warming up')
  })
)