import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f1f0f6;
`;

const PropertyFilter: FC = ({ children }) => {
  return (
    <Wrapper className="h-full w-2/5 h-100 max-h-full">{children}</Wrapper>
  );
};

export { PropertyFilter };
