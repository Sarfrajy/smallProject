const postResolvers = require('./Posts');
const usersResolvers = require('./users');

module.exports={
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation
    }
}
