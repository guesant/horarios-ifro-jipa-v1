import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { GeneratorForm } from "../components/Generator/GeneratorForm";
import { GeneratorFormContextProvider } from "../components/Generator/GeneratorFormContext";
import Container from "react-bootstrap/Container";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Horários IFRO Ji-Paraná</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Início" />

      <main>
        <GeneratorFormContextProvider>
          <GeneratorForm />
        </GeneratorFormContextProvider>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
