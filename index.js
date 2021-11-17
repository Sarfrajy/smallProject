const {ApolloServer}= require('apollo-server');
const mongoose=require('mongoose');

const resolvers = require('./graphql/resolvers');
const {MONGODB}=require('./config')
const typeDefs = require('./graphql/typeDefs')


const server = new ApolloServer({typeDefs, resolvers});
mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{
    console.log('connected')
    return server.listen(5000);
})
.then((res)=>{
    console.log(`Your Api is Running at ${res.url}`);
});