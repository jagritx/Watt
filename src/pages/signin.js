import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.accent};
`;
const SubTitle = styled.h2`
  color: ${({ theme }) => theme.subheading};
  font-size: 25px;
  font-weight: bold;
`;
const Input = styled.input`
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  background-color: ${({ theme }) => theme.inputs};
  margin: 10px;
  width: 440px;
  height: 50px;
  color: ${({ theme }) => theme.text};
  font-size: 25px;
  font-weight: bold;
  transition: 0.3s;
  ::placeholder {
    color: ${({ theme }) => theme.subheading};
    font-size: 25px;
    font-weight: bold;
  }
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.accent};
  width: 500px;
  margin: 10px;
  padding: 20px 40px;
  color: white;
  font-size: 25px;
  font-weight: bold;
  transition: 0.3s;
  :hover {
    opacity: 0.8;
  }
`;

const SignPrompt = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 25px;
  font-weight: bold;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
`;
const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      const token = res.data.token;
      setCookie("accessToken", token, 1);
      dispatch(loginSuccess(res.data));
      navigate(`/`);
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      const token = res.data.token;
      setCookie("accessToken", token, 1);
      dispatch(loginSuccess(res.data));
      navigate(`/`);
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  const signInWithGoogle = async () => {
    dispatch(loginStart);
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            const token = res.data.token;
            setCookie("accessToken", token, 1);
            dispatch(loginSuccess(res.data));
          });
        navigate(`/`);
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Wat</Title>
        {!register ? (
          <>
            <SubTitle>Welcome Back. Sign in now.</SubTitle>
            <Input
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Sign In</Button>

            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                border: "0.5px solid lightgrey",
              }}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </>
        ) : (
          ""
        )}
        {register ? (
          <>
            {" "}
            <SubTitle>The Video Library Place. Sign up now.</SubTitle>
            <Input
              placeholder="Enter a unique username"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignup}>Sign Up</Button>
          </>
        ) : (
          ""
        )}
      </Wrapper>

      <SignPrompt
        onClick={() => setRegister(!register)}
        style={{ margin: "30px" }}
      >
        {register ? "Already have an account?" : "Sign up here!"}
      </SignPrompt>
    </Container>
  );
};

export default Signin;
