/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createTodoUserCount = /* GraphQL */ `
  mutation CreateTodoUserCount(
    $input: CreateTodoUserCountInput!
    $condition: ModelTodoUserCountConditionInput
  ) {
    createTodoUserCount(input: $input, condition: $condition) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTodoUserCount = /* GraphQL */ `
  mutation UpdateTodoUserCount(
    $input: UpdateTodoUserCountInput!
    $condition: ModelTodoUserCountConditionInput
  ) {
    updateTodoUserCount(input: $input, condition: $condition) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodoUserCount = /* GraphQL */ `
  mutation DeleteTodoUserCount(
    $input: DeleteTodoUserCountInput!
    $condition: ModelTodoUserCountConditionInput
  ) {
    deleteTodoUserCount(input: $input, condition: $condition) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
