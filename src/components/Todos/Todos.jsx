import React from "react";
import Todo from "../Todo/Todo";

const Todos = ({ todoList, setTodoList }) => {
  return (
    <div>
      <h3>Todo List</h3>
      {todoList.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </div>
  );
};

export default Todos;
