import React from "react";
import Section from "./Section";
import { memo } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Section>{children}</Section>
    </>
  );
};

export default memo(Layout);
