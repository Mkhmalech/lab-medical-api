import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const LabTests = graphqlHTTP({
    schema : Schema.LabTestsSchema,
    rootValue : Resolver.LabTestsResolver,
    graphiql : true
})