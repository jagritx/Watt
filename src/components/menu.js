import styled from "styled-components";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow: scroll;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 30px;
  color: ${({ theme }) => theme.accent};
  margin: 25px;
  margin-bottom: 50px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 20px;
  gap: 20px;
  cursor: pointer;
  padding: 20px 100px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.inputs};
  color: ${({ theme }) => theme.text};
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin: 50px 0px;

  font-weight: bold;
  gap: 10px;
`;
const Button = styled.button`
  padding: 15px 80px;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  text-align: center;
`;

const Menu = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(false);
  };
  const handleClick = () => {
    alert("Wubba Lubba Dub Dub");
  };
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            Watt
          </Link>
          <SettingsBrightnessOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => props.setDarkMode(!props.darkMode)}
          />
        </Logo>

        <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>Home</Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>Explore</Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>Subscriptions</Item>
        </Link>
        <Link to="about" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>About</Item>
        </Link>
        {!currentUser ? (
          <>
            <Login>
              Sign in to like, share, subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  Sign In
                </Button>
              </Link>
            </Login>
          </>
        ) : (
          <Login onClick={handleLogout}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button>Sign out</Button>
            </Link>
          </Login>
        )}

        <Title>Made by Jagrit Kamra</Title>

        <Item onClick={handleClick}>
          <SettingsOutlinedIcon />
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
