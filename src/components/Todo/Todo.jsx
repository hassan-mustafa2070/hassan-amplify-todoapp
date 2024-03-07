import { deleteTodo } from "../../graphql/mutations";
import "./todo.css";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Todo = ({ todo, todoList, setTodoList }) => {
  async function DeleteTodo(id) {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: {
          input: { id },
        },
      });
      const filteredTodo = todoList.filter((todo) => todo?.id !== id);
      setTodoList(filteredTodo);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div className="wrapper">
      <div className="todo">
        <div className="titleanddescription">
          <span>{todo?.title}</span>
          <p>{todo?.description}</p>
        </div>
        <button onClick={() => DeleteTodo(todo?.id)}>Delete</button>
      </div>

      <img
        src={`${process.env.REACT_APP_AWS_S3_OBJECT_URL}${todo?.image}`}
        alt="lala"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Todo;
