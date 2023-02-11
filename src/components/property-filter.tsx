import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  margin-top: 2rem;
`;

const PropertyFilter: FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export { PropertyFilter };
