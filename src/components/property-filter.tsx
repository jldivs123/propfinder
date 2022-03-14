import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  border: 1px solid black;
`;

const PropertyFilter: FC = ({ children }) => {
  return <Wrapper className="flex-1 property-container ">{children}</Wrapper>;
};

export { PropertyFilter };
