import { useState } from "react";
import Comment from "./components/Comment";
import useCustomHook from "./hooks/CustomHook";
import "./styles.css";
import user1 from './assets/user1.png'
import user2 from './assets/user2.png'
import user3 from './assets/user3.png'
import user4 from './assets/user4.png'

const comments = {
  id: 1,
  items: [],
};

const users = [
  {
    id: 1,
    name: "John Doe",
    image: user1
  },
  {
    id: 2,
    name: "Alice Smith",
    image: user2
  },
  {
    id: 3,
    name: "Bob Johnson",
    image: user3
  },
  {
    id: 4,
    name: "Bob Johnson",
    image: user4
  },
];
const App = () => {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useCustomHook();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <div className="App">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
        users={users}
      />
    </div>
  );
};

export default App;