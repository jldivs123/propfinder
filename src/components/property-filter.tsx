import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<FC>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PropertyFilter: FC = ({ children }) => {
  return (
    <Wrapper className="h-full w-2/5 h-100 max-h-full min-h-screen justify-center align-center">
      {children}
    </Wrapper>
  );
};

export { PropertyFilter };
