import styled from "styled-components";
import { throttle } from "../utils";

type Props = {
  title?: string;
  text?: string;
  setText?: (val: string) => void;
  size?: number;
  setSize?: (val: string) => void;
  fill?: string;
  setFill?: (val: string) => void;
  stroke?: string;
  setStroke?: (val: string) => void;
};

export default function TextCotroller({
  title = "",
  text,
  setText,
  size = 45,
  setSize,
  fill = "#ffffff",
  setFill,
  stroke = "#000000",
  setStroke,
}: Props) {
  return (
    <Container>
      <Heading>{title}</Heading>
      <Wrapper>
        <TextInput
          value={text}
          onChange={e => setText?.(e.target.value)}
          type="text"
          placeholder={`Enter ${title}...`}
        />
        <InputContainer>
          <Label>Font size :</Label>
          <Input
            value={size}
            onChange={e => setSize?.(e.target.value)}
            type="range"
          />
        </InputContainer>
        <InputContainer>
          <Label>Color :</Label>
          <Input
            value={fill}
            onChange={throttle(e => setFill?.(e.target.value), 1000)}
            type="color"
          />
        </InputContainer>
        <InputContainer>
          <Label>Stroke color :</Label>
          <Input
            value={stroke}
            onChange={e => setStroke?.(e.target.value)}
            type="color"
          />
        </InputContainer>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin: 5px 0px;
`;

const Heading = styled.p`
  text-transform: capitalize;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  padding: 2px 0px;
`;

const Wrapper = styled.div`
  padding: 10px;
  border-top: 1px solid rgb(171, 171, 171);
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  margin: 5px;
`;

const TextInput = styled.input`
  width: 100%;
  margin: 7px 0px;
  background-color: #c5c5c599;
  border-radius: 10px;
  padding: 7px;
  font-size: 18px;
  border: 1px solid #bbbbbb;
  outline: none;
`;
