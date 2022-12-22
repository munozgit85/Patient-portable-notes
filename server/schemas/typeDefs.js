// import the gql tagged template function
//Tagged templates are an advanced use of template literals,
const { gql } = require("apollo-server-express");

// create our typeDefs
// first query
//query named helloWorld. Not only that, we also explicitly specified that the type of data
// to be returned by this query will be a string.
//With this custom data type, we are able to instruct the thoughts query so that each thought that returns can include _id,
//thoughtText, username, and reactionCount fields with their respective GraphQL scalars.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    thoughts: [Thought]
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtTextA: String
    thoughtTextB: String
    createdAt: String
    username: String
    reactions: [Reaction]
    exams: [Exam]
    diagnoses: [Diagnosis]
    dispositions: [Disposition]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    username: String
  }

  type Exam {
    _id: ID
    examBody: String
    username: String
  }

  type Diagnosis {
    _id: ID
    diagnosisBody: String
    username: String
  }
  type Disposition {
    _id: ID
    dispositionBody: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(
      thoughtText: String!
      thoughtTextA: String!
      thoughtTextB: String!
    ): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addExam(thoughtId: ID!, examBody: String!): Thought
    addDiagnosis(thoughtId: ID!, diagnosisBody: String!): Thought
    addDisposition(thoughtId: ID!, dispositionBody: String!): Thought
    deleteDisposition(dispositionId: ID!): Thought
    deleteThought(thoughtId: ID!): Thought
  }
`;

module.exports = typeDefs;
