import Image, { ImageProps } from "./Image";
import styled from "styled-components";

export type ImageType = ImageProps & { id: string | number };

type Props = {
  images: ImageType[];
  onImageSelect?: (src: ImageType) => void;
};

export default function Images({ images, onImageSelect }: Props) {
  return (
    <>
      <ImagesContainer>
        {images.map(image => (
          <Image
            size={120}
            onClick={() => onImageSelect?.(image)}
            key={image.id}
            {...image}
          />
        ))}
      </ImagesContainer>
    </>
  );
}

const ImagesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  height: 230px;
`;
