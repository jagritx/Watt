import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000aa;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 25px;
  color: ${({ theme }) => theme.text};
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 60px;
  right: 40px;
  cursor: pointer;
`;
const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.accent};
`;
const Input = styled.input`
  border: none;
  border-radius: 20px;
  padding: 20px 20px;
  font-size: 10px;
  background-color: ${({ theme }) => theme.inputs};
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: bold;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 20px;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.inputs};
  color: ${({ theme }) => theme.text};
  font-size: 15px;
`;
const Button = styled.button`
  border: none;
  color: white;
  border-radius: 20px;
  padding: 20px 30px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.accent};
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  border-radius: 3px;
  font-size: 15px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>
          <CloseIcon />
        </Close>
        <Title>Upload a new video</Title>
        <Label>Video:</Label>

        {videoPerc > 0 ? (
          "Uploading " + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          name="title"
          placeholder="Enter a title"
          onChange={handleChange}
        />
        <Desc
          placeholder="A suitable description goes here"
          name="desc"
          row={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter tags with commas..."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
