import React from "react";
import styled from "styled-components";

const Help = styled.a`
  text-decoration: none;
  color: #746aff;
  font-size: 100px;
  font-weight: 100;
  transition: 0.7;
  :hover {
    opacity: 0.7;
  }
`;
const about = () => {
  return (
    <>
      <Help href="https://www.linkedin.com/in/jagritkamra/">LinkedIn</Help>
      <br />
      <Help href="https://github.com/jagritx">Github</Help>
    </>
  );
};

export default about;
