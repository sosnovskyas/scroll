import * as React from "react";
import styled from "styled-components";
import { IGalleryImage } from "../modules/gallery/gallery-types";

const Image = styled.img``;
const ImageWrapper = styled<{ size: number }, "div">("div")`
  position: relative;
  height: ${p => p.size}px;
  width: ${p => p.size}px;
`;

export const ImageItem = (image: IGalleryImage) => (
  <ImageWrapper size={100}>
    <Image src={image.url} alt={image.alt} />
  </ImageWrapper>
);
