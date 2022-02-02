import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

export type ImageProps = {
  src: string;
  caption?: string;
  size?: number | string;
  onClick?: () => void;
};

export default function Image(image: ImageProps) {
  const size = image.size || "200px";

  return (
    <Container>
      <ImageContainer onClick={image.onClick}>
        <LazyLoadImage
          style={{
            height: size,
            width: size,
            objectFit: "contain",
            objectPosition: "center",
          }}
          alt={image.caption || image.src}
          src={image.src}
        />
      </ImageContainer>
      {image.caption && <Caption>{image.caption}</Caption>}
    </Container>
  );
}

const Container = styled.div`
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  flex: 1;
  cursor: pointer;
  transform: scale(0.9);
  transition: all 0.4s ease;

  :hover {
    transform: scale(1);
  }
`;

const Caption = styled.div`
  font-weight: 500;
  text-align: center;
  padding: 5px;
  background-color: #dfdfdf61;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
