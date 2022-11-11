import React, { ReactNode } from "react";
import Layout from "~/content/components/Layout";
import PageMeta from "~/content/components/PageMeta";
import HomeContent from "~/content/pages/home";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => (
  <>
    <PageMeta />
    <HomeContent />
  </>
);

Home.getLayout = (children: ReactNode) => <Layout>{children}</Layout>;

export default Home;
