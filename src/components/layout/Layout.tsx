import React from "react";
import Header from "./Header";
import Section from "./Section";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <Section>{children}</Section>
    </>
  );
};

export default Layout;
