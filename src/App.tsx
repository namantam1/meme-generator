import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import memeApi from "./api/meme";
import Images from "./components/image/Images";
import Loader from "./components/Loader";
import Text from "./components/Text";
import TextCotroller from "./components/TextCotroller";
import { exportSvg, imageToBase64, shareImage, svgToCanvas } from "./utils";

type ImageType = { id: number | string; caption?: string; src: string };

const defaultText = {
  text: "",
  fill: "#ffffff",
  fontSize: 60,
  strokeWidth: 0,
  stroke: "#000000",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState("");
  const svgRef = useRef<any>();
  const [texts, setTexts] = useState({
    1: defaultText,
    2: defaultText,
  });

  useEffect(() => {
    setLoading(true);
    memeApi()
      .then(res => res && setImages(res))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    imageToBase64(imageSrc).then(res => setImage(res));
  }, [imageSrc]);

  const handleDownload = async () => {
    setLoading(true);
    await exportSvg(svgRef.current);
    setLoading(false);
  };

  const handleShare = async () => {
    setLoading(true);
    const canvas = await svgToCanvas(svgRef.current);
    canvas.toBlob(async blob => {
      if (blob) {
        await shareImage(blob);
      }

      setLoading(false);
    });
  };

  const handleImageSelect = (img: ImageType) => {
    setImageSrc(img.src);
  };

  const handleText = (id: 1 | 2) => (text: string) =>
    setTexts({ ...texts, [id]: { ...texts[id], text } });
  const handleFill = (id: 1 | 2) => (fill: string) =>
    setTexts({ ...texts, [id]: { ...texts[id], fill } });
  const handleSize = (id: 1 | 2) => (size: string) =>
    setTexts({ ...texts, [id]: { ...texts[id], size } });
  // const handleColor = (id: 1 | 2) => (color: string) =>
  //   setTexts({ ...texts, [id]: { ...texts[id], color } });

  const disabled = !imageSrc;
  return (
    <BackContainer>
      <Loader loading={loading} />
      <Container>
        <SideBar>
          <SideBarContainer>
            <Title>Meme Generator</Title>
            <TextCotroller
              title="first text"
              {...texts[1]}
              setText={handleText(1)}
              setFill={handleFill(1)}
              setSize={handleSize(1)}
            />
            <TextCotroller
              title="second text"
              {...texts[2]}
              setText={handleText(2)}
              setFill={handleFill(2)}
              setSize={handleSize(2)}
            />
            <Button disabled={disabled} onClick={handleDownload}>
              Download
            </Button>
            <Button disabled={disabled} onClick={handleShare} color="#777777">
              Share
            </Button>
          </SideBarContainer>
        </SideBar>
        <MainContainer>
          <EditorContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              ref={svgRef}
              style={{
                maxWidth: "100%",
                height: "450px",
                width: "500px",
                backgroundImage: `url(${image})`,
                backgroundColor: "#fff",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Text y="25%" {...texts[1]} parentRef={svgRef} />
              <Text y="75%" {...texts[2]} parentRef={svgRef} />
            </svg>
          </EditorContainer>
          <Images onImageSelect={handleImageSelect} images={images} />
        </MainContainer>
      </Container>
    </BackContainer>
  );
}

export default App;

const BackContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  margin: 0px auto;
  /* background-color: antiquewhite; */
  position: relative;
  top: 19px;
  width: 1396px;
  height: calc(100% - 55px);
  overflow: hidden;
  display: flex;
  box-shadow: 2px 2px 8px 1px #00000063;
`;

const SideBar = styled.div`
  /* width: 30%; */
  border-right: 1px solid #c4c4c4;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  padding: 5px;
  background-color: #ececec62;
  font-style: italic;
  box-shadow: 1px 1px 2px 0.1px #00000063;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MainContainer = styled.div`
  /* flex: 70%; */
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const EditorContainer = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

/* font-size: ${({ size }) => size || "18px"}; */
type ButtonProps = { textColor?: string; size?: number | string };
const Button = styled.button`
  margin-top: 5px;
  background-color: ${({ color }) => color || "#2196f3"};
  color: ${(props: ButtonProps) => props.textColor || "#fff"};
  font-size: ${(props: ButtonProps) => props.textColor || "18px"};
  padding: 8px 12px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(-0.2rem);
  }

  &:disabled {
    opacity: 0.7;
    cursor: no-drop;
  }
`;
