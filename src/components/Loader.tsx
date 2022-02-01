import styled from "styled-components";
import loadingImg from "../assets/images/loader.svg";

export default function Loader({ loading = false }) {
  if (!loading) return null;
  return (
    <Wrapper>
      <img src={loadingImg} alt="loading..." />
      <Text>Plealse wait while processing...</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #00000030;
`;

const Text = styled.p`
  text-align: center;
  font-size: 18px;
  color: #662339;
`;
