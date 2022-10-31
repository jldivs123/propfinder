import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PropertyFilter: FC = ({ children }) => {
  return <Wrapper className="grow">{children}</Wrapper>;
};

export { PropertyFilter };
