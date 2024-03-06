import { useEffect, useState } from "react";
import "./createtodo.css";
import Todos from "../Todos/Todos";
import { PiSignOutBold } from "react-icons/pi";
import { createTodo } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import gql from "graphql-tag";

const Createtodo = ({ signOut, user }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = generateClient();

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const todoData = await client.graphql({
        query: gql`
      query ListTodos {
        listTodos(filter: { createdBy: { eq: "${user.signInDetails.loginId}" } }) {
          items {
            id
            title
            description
          }
        }
      }
    `,
      });
      const todos = todoData.data.listTodos.items;
      setTodoList(todos);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("error fetching todos:", err);
    }
  }

  async function addTodo() {
    try {
      if (!todoTitle && !todoDescription) {
        return alert("Please fill all fields");
      }
      const newtodo = {
        id: (Math.random() * 1000).toLocaleString(),
        title: todoTitle,
        description: todoDescription,
        createdBy: user.signInDetails.loginId,
      };

      await client.graphql({
        query: createTodo,
        variables: {
          input: newtodo,
        },
      });
      setTodoList((list) => [...list, { ...newtodo }]);
      setTodoTitle("");
      setTodoDescription("");
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
  console.log("todolist", todoList);
  return (
    <>
      {!isLoading && (
        <div className="wrapper">
          <div className="todocontainer">
            <div className="headingandsignout">
              <h3>Todo App</h3>
              <PiSignOutBold size={20} cursor={"pointer"} onClick={signOut} />
            </div>

            <div className="inputfieldbox">
              <span>Title:</span>
              <input
                type="text"
                placeholder="Todo Title"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
            </div>
            <div className="inputfieldbox">
              <span>Description:</span>
              <input
                type="text"
                placeholder="Todo Description"
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
              />
            </div>
            <button className="addbutton" onClick={addTodo}>
              Add
            </button>
            {todoList?.length > 0 ? (
              <Todos todoList={todoList} setTodoList={setTodoList} />
            ) : (
              "No todos to show"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Createtodo;
