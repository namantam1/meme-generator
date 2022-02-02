import Image, { ImageProps } from "./Image";
import styled from "styled-components";

export type ImageType = ImageProps & { id: string | number };

type Props = {
  images: ImageType[];
  onImageSelect?: (src: ImageType) => void;
};

export default function Images({ images, onImageSelect }: Props) {
  return (
    <Wrapper>
      <ImagesContainer>
        {images.map(image => (
          <Image
            size={100}
            onClick={() => onImageSelect?.(image)}
            key={image.id}
            {...image}
          />
        ))}
      </ImagesContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* height: 100%; */
  overflow: auto;
`;

const ImagesContainer = styled.div`
  display: flex;
  height: 100%;
`;
