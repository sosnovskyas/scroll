import styled from "styled-components";
import loader from "./loader.gif";

export const ScrollWrapper = styled<{ width: number; height: number }, "div">(
  "div"
)`
  border: 1px dashed brown;
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  overflow: auto;
`;
export const Layout = styled<
  { width: number; height: number; itemSize: number },
  "div"
>("div")`
  position: relative;
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  background-image: url(${loader});
  background-size: ${p => p.itemSize}px;
`;

export const ItemWrapper = styled<{ index: number; height: number }, "div">(
  "div"
)`
  position: absolute;
  top: ${p => p.index * p.height}px;
  border: 1px solid black;
  width: 100px;
  height: ${p => p.height}px;
  background-color: #000;
`;
