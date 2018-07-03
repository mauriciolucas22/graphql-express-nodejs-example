const { makeExecutableSchema } = require('graphql-tools');

const posts = [
  { id: 1, title: 'Introduction to GraphQL', test: '' },
  { id: 2, title: 'Welcome to Meteor', test: '' },
  { id: 3, title: 'Advanced GraphQL', test: '' },
  { id: 4, title: 'Launchpad is Cool', test: '' },
];

const typeDefs = `
  type Post {
    id: Int!
    title: String!
    test: String!
  }

  type Query {
    allPosts: [Post!]
  }

  type Mutation {
    createPost(title: String!): Post
  }
`;

const resolvers = {
  Post: {
    test: (post) => 'TEST', // mutation trivial
  },

  Query: {
    allPosts: () => posts,
  },

  Mutation: {
    createPost: (parent, args, context, info) => {
      const newPost = Object.assign({id: posts.length + 1}, args);
      posts.push(newPost);
      return newPost;
    },
  },
};

exports.makeExecutableSchema = makeExecutableSchema({ typeDefs, resolvers });