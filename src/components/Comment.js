import React, { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ReactComponent as Send } from "../assets/send.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Unlike } from "../assets/unlike.svg";


const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  users, 
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);
  const [likes, setLikes] = useState(false); 
  const inputRef = useRef(null);
  const [user, setUser] = useState({}); 

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  useEffect(() => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    setUser(randomUser);
  }, [users]);

  const handleNewComment = () => {
    setExpand(expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef.current?.innerText);
    } else {
      if (input.trim() !== "") {
        setExpand(true);
        handleInsertNode(comment.id, input);
        setShowInput(false);
        setInput("");
      }
    }

    setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  const handleLikeToggle = () => {
    setLikes(!likes);
  };

  return (
    <div className="appContainer">
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        <div className="userImages">
          <img src={user.image} alt={user.name} width="40px" height="40px" /> 
          <span>{user.name}</span> 
        </div>

        {comment.id === 1 ? (

          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your comment"
              style={{ wordWrap: "break-word" }}

            />
            <Action
              className="submitButton"
              type={<Send/>}
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
              className="editText"
            >
              {comment.name}
            </span>
            <div style={{ display: "flex", marginTop: "10px", paddingLeft: "50px" }}>
              <button className="LikeButton" onClick={handleLikeToggle}>
                {likes ? <Like width="20px" height="20px" fill="red" /> : <Unlike width="20px" height="20px" />}
                <span>{likes ? 1 : 0}</span>
              </button>
              {editMode ? (
                <>
                  <Action className="reply" type="SAVE" handleClick={onAddComment} />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        Reply
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action className="remove" type="Remove" handleClick={handleDelete} />
                </>
              )}

            </div>
          </>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your reply"
              style={{ wordWrap: "break-word" }}

            />
            <Action className="reply" type="Reply" handleClick={onAddComment} />
            <Action
              className="reply"
              type="Cancel"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comment?.items?.map((cmnt) => (
          <Comment
            key={cmnt.id}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            comment={cmnt}
            users={users} 
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
