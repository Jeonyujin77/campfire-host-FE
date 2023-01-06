import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import { memo } from "react";

const Section = ({ children }: React.PropsWithChildren) => {
  return (
    <SecitonWrapper>
      <Paper className="section">{children}</Paper>
    </SecitonWrapper>
  );
};

const SecitonWrapper = styled.div`
  margin-left: 280px;
  min-width: 740px;
  min-height: 800px;
  padding: 20px;

  .section {
    width: calc(100%-40px);
    min-height: 800px;
    padding: 20px;

    h2 {
      padding: 20px 0;
      border-bottom: 1px solid #dbdbdb;
    }
  }
`;

export default memo(Section);
