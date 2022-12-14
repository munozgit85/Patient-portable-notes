import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought(
    $thoughtText: String!
    $thoughtTextA: String!
    $thoughtTextB: String!
  ) {
    addThought(
      thoughtText: $thoughtText
      thoughtTextA: $thoughtTextA
      thoughtTextB: $thoughtTextB
    ) {
      _id
      thoughtText
      thoughtTextA
      thoughtTextB
      createdAt
      username
      reactions {
        _id
      }
      exams {
        _id
      }
      diagnoses {
        _id
      }
      dispositions {
        _id
      }
    }
  }
`;
export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactions {
        _id
        reactionBody
        username
      }
    }
  }
`;

export const ADD_EXAM = gql`
  mutation addExam($thoughtId: ID!, $examBody: String!) {
    addExam(thoughtId: $thoughtId, examBody: $examBody) {
      _id
      exams {
        _id
        examBody
        username
      }
    }
  }
`;

export const ADD_DIAGNOSIS = gql`
  mutation addDiagnosis($thoughtId: ID!, $diagnosisBody: String!) {
    addDiagnosis(thoughtId: $thoughtId, diagnosisBody: $diagnosisBody) {
      _id
      diagnoses {
        _id
        diagnosisBody
        username
      }
    }
  }
`;

export const ADD_DISPOSITION = gql`
  mutation addDisposition($thoughtId: ID!, $dispositionBody: String!) {
    addDisposition(thoughtId: $thoughtId, dispositionBody: $dispositionBody) {
      _id
      dispositions {
        _id
        dispositionBody
        username
      }
    }
  }
`;

export const DELETE_DISPOSITION = gql`
  mutation deleteDisposition($dispositionId: ID!) {
    deleteDisposition(dispositionId: $dispositionId) {
      _id
      dispositions {
        _id
      }
    }
  }
`;

export const DELETE_THOUGHT = gql`
  mutation deleteThought($id: ID!) {
    deleteThought(_id: $id) {
      _id
      thoughts {
        _id
      }
    }
  }
`;
