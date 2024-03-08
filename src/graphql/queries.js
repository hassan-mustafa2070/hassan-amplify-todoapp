/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      description
      createdBy
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdBy
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTodoUserCount = /* GraphQL */ `
  query GetTodoUserCount($id: ID!) {
    getTodoUserCount(id: $id) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodoUserCounts = /* GraphQL */ `
  query ListTodoUserCounts(
    $filter: ModelTodoUserCountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoUserCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        count
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
