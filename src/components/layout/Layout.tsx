import React from "react";
import Header from "./Header";
import Section from "./Section";
import { memo } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <Section>{children}</Section>
    </>
  );
};

export default memo(Layout);
