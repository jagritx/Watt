import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Upload from "./upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  margin-top: 25px;
  margin-left: 60px;
  position: relative;
`;
const Search = styled.div`
  width: 80%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  border: none;
  background-color: ${({ theme }) => theme.inputs};
  width: 90%;
  padding: 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: bold;
  ::placeholder {
    font-size: 20px;
    font-weight: bold;
  }
`;
const Button = styled.button`
  padding: 20px 30px;

  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;
const User = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon
              style={{
                position: "absolute",
                marginLeft: "69%",
                cursor: "pointer",
                color: "#746AFF",
                fontSize: "30px",
              }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          {currentUser ? (
            <>
              <VideoCallOutlinedIcon
                onClick={() => setOpen(true)}
                style={{
                  cursor: "pointer",
                  color: "#746AFF",
                  fontSize: "30px",
                  marginTop: "5px",
                }}
              />
              <User style={{ marginTop: "30px" }}>
                <Avatar src={currentUser.img} />
                {currentUser.name}
              </User>
            </>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Sign In
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload style={{ overflow: " hidden" }} setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
