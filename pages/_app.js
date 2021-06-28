import React from "react";
import App from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import {Container} from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';


// This default export is required in a new `pages/_app.js` file.
class MyApp extends App {

  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //Anything returned here can be access by the client
    return {pageProps: pageProps};
  }


  render() {
    const {Component, pageProps} = this.props;

    return(
        <Container>
          <Head>
            <link
                async
                rel="stylesheet"
                href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.3/dist/semantic.min.css"
            />
            <script async src="//cdn.jsdelivr.net/npm/semantic-ui@2.0.3/dist/semantic.min.js"/>
            <link rel='icon' href='/icon.ico'/>
            <title>Kickstarter</title>
          </Head>
          <Header />
          <Component {...pageProps} />
        </Container>
    )
  }
}

export default MyApp;
