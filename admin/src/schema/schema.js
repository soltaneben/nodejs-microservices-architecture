const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;
const categoryService = require('../models/Category/Queries/category');

// Defining a book object
const CategoryType = new GraphQLObjectType({
    name: 'Cateogry',
    fields: () => ({
        _id: { type: GraphQLID},
        title: { type: GraphQLString},
        description: { type: GraphQLString},
        // created_at: { type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        categories: {
            type: new GraphQLList(CategoryType),
            args: {_id: {type: GraphQLID}},
            async resolve(parent, args){
                // code to get data from the database
                // args will store the args sent from the client that we already defined like the id
                // we can access it via args.id
                // return _.find(dummy.books, {id: args.id});
                let categoriesList = await categoryService.getCategoriesList();
                console.log('categoriesList: ', categoriesList);
                return categoriesList; 
            }
        },
    }
})


// Operations / Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args){
                let category = await categoryService.createCategory(args);
                return category;
            }
        },
    }
})



// Define which query the user can interact with from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});