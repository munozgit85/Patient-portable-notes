import { gql } from "@apollo/client";

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String!) {
    thoughts(username: $username) {
      _id
      thoughtText
      thoughtTextA
      thoughtTextB
      createdAt
      username
      reactions {
        _id
        username
        reactionBody
      }
      exams {
        _id
        username
        examBody
      }
      diagnoses {
        _id
        username
        diagnosisBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      thoughtTextA
      thoughtTextB
      createdAt
      username
      reactions {
        _id
        username
        reactionBody
      }
      exams {
        _id
        username
        examBody
      }
      diagnoses {
        _id
        username
        diagnosisBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email

      thoughts {
        _id
        thoughtText
        thoughtTextA
        thoughtTextB
        createdAt
      }
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtTextA
        thoughtTextB
        createdAt
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
        exams {
          _id
          createdAt
          examBody
          username
        }
        diagnoses {
          _id
          createdAt
          diagnosisBody
          username
        }
      }
    }
  }
`;
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
