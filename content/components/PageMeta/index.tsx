import Head from "next/head";
import React from "react";

interface Props {
  title?: string;
  description?: string;
}

const PageMeta = ({ title, description }: Props) => {
  const pageTitle = title ? `Open Meetup | ${title}` : `Open Meetup`;
  const pageDescription = description || "Find new friends and meetup together";
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta content={pageDescription} name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
  );
};

export default PageMeta;
