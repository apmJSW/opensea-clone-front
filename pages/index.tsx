import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Banner, TopHeader } from "@/components";

const Home: NextPage = () => {
  return (
    <div>
      <TopHeader />
      <Banner />
    </div>
  );
};

export default Home;
