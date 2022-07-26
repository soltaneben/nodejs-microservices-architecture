const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;
const productService = require('../models/Product/Querties/products');

// Defining a book object
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLID},
        title: { type: GraphQLString},
        description: { type: GraphQLString},
        price: { type: GraphQLInt},
        category_id: { type: GraphQLString},
        // created_at: { type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            args: {_id: {type: GraphQLID}},
            async resolve(parent, args){
                // code to get data from the database
                // args will store the args sent from the client that we already defined like the id
                // we can access it via args.id
                // return _.find(dummy.books, {id: args.id});
                let productsList = await productService.getProducts();
                return productsList; 
            }
        },
    }
})


// Operations / Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                price: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                category_id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args){
                let product = await productService.createProduct(args);
                return product;
            }
        },
    }
})



// Define which query the user can interact with from the front-end
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});