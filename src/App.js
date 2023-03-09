import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/menu";
import Navbar from "./components/navbar";
import { darkTheme, lightTheme } from "./utils/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Video from "./pages/video";
import SignIn from "./pages/signin";
import Search from "./pages/search";
import About from "./pages/about";
const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 3.5;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 40px 60px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="about" element={<About />} />
                  <Route path="trends" index element={<Home type="trend" />} />
                  <Route
                    path="subscriptions"
                    index
                    element={<Home type="sub" />}
                  />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
