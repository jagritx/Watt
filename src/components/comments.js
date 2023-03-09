import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./comment";

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.inputs};
  outline: none;
  padding: 15px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
  width: 68%;
`;
const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.soft};
  color: white;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 15px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.accent};
  cursor: pointer;
`;
function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newcomment, setNewcomment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const addComment = async () => {
    try {
      const res = await axios.post(`/comments`, {
        desc: newcomment,
        videoId: videoId,
      });
      console.log(res);
      window.location.reload(false);
    } catch (err) {}
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Drop a comment..."
          onChange={(e) => {
            setNewcomment(e.target.value);
          }}
        />
        <Button onClick={addComment}>Add</Button>
      </NewComment>
      {comments
        .slice(0)
        .reverse()
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  );
}

export default Comments;
