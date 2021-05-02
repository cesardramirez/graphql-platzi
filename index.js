'use strict'

const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// Definiendo el esquema (con las queries del archivo).
const schema = buildSchema(
  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'), 'utf-8'
  )
)

// Se ejecutan cada uno de los queries.
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

// Se agrega la interfaz gráfica de Playground para GraphQL.
app.get('/', expressPlayground({ endpoint: '/graphql' }))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/`)
})
