import React from "react";
import styled from "styled-components";
import { IoStopOutline } from "react-icons/io5";

const Style = {
  StopButton: styled.button`
  color: #9407bb;
  border: none;
  background-color: transparent;
  font-size: 2em;
  transition: all 0.2s;
  filter: drop-shadow(0px 0px 1px #9407bb);

  &:hover {
    filter: drop-shadow(0px 0px 5px #9407bb);
    cursor: pointer;
  }
  `,
};

const StopButton = ({ onClick }) => (
  <Style.StopButton onClick={onClick}>
    <IoStopOutline />
  </Style.StopButton>
);

export default StopButton