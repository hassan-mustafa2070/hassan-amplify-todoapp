/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
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
export const onCreateTodoUserCount = /* GraphQL */ `
  subscription OnCreateTodoUserCount(
    $filter: ModelSubscriptionTodoUserCountFilterInput
  ) {
    onCreateTodoUserCount(filter: $filter) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodoUserCount = /* GraphQL */ `
  subscription OnUpdateTodoUserCount(
    $filter: ModelSubscriptionTodoUserCountFilterInput
  ) {
    onUpdateTodoUserCount(filter: $filter) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodoUserCount = /* GraphQL */ `
  subscription OnDeleteTodoUserCount(
    $filter: ModelSubscriptionTodoUserCountFilterInput
  ) {
    onDeleteTodoUserCount(filter: $filter) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
