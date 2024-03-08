import { useEffect, useState } from "react";
import "./createtodo.css";
import Todos from "../Todos/Todos";
import { PiSignOutBold } from "react-icons/pi";
import { createTodo } from "../../graphql/mutations";
import {listTodos} from '../../graphql/queries'
import { generateClient } from "aws-amplify/api";
import gql from "graphql-tag";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { FaFileImage } from "react-icons/fa";
import { uploadData } from "aws-amplify/storage";

const Createtodo = ({ signOut, user }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  // const [imagekey, setimagekey] = useState("tree-736885_1280.jpg");
  const client = generateClient();
  // drhgrhhdr

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
            image
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
      if (!todoDescription) {
        return alert("Please fill all fields");
      }
      if (!image) {
        return alert("Please upload image");
      }
      const result = await uploadData({
        key: fileName,
        data: image,
      }).result;
      console.log("Succeeded: ", result);

      const newtodo = {
        id: (Math.random() * 1000).toLocaleString(),
        title: todoTitle,
        description: todoDescription,
        createdBy: user.signInDetails.loginId,
        image: result.key,
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
      setShowImage(null);
      setImage(null);
      setFileName("No file Selected");
    } catch (err) {
      console.log("Error : ", err);
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
            <div
              className="imageuploadbox"
              onClick={() => document.querySelector(".image-input").click()}
            >
              <input
                type="file"
                accept="image/*"
                className="image-input"
                hidden
                onClick={(event) => {
                  event.target.value = null;
                }}
                onChange={({ target: { files } }) => {
                  files[0] && setFileName(files[0].name);
                  if (files) {
                    setShowImage(URL.createObjectURL(files[0]));
                    setImage(files[0]);
                  }
                }}
              />
              {showImage ? (
                <img src={showImage} alt={fileName} className="uploadedimg" />
              ) : (
                <MdCloudUpload size={60} color="grey" />
              )}
            </div>
            <div className="filenamebox">
              <FaFileImage />
              {fileName}
              <MdDelete
                cursor={"pointer"}
                onClick={() => {
                  setFileName("No file selected");
                  setImage(null);
                  setShowImage(null);
                }}
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
