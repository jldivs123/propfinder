import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid blue;
  min-height: 90vh;
`;

const PropertyFilter: FC = ({ children }) => {
  return <Wrapper className="grow p-1">{children}</Wrapper>;
};

export { PropertyFilter };
