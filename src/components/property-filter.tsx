import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  border: 1px solid black;
`;

const PropertyFilter: FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export { PropertyFilter };
