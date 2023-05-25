import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from '/src/components/head';
import Header from '/src/components/header';


export default function Home() {

  return (
    <React.Fragment>
      <Head title="404" description="Tabela FIPE Não encontrada!" />
      <Header />

      <div id="section-wrapper" className="sectionWrapper">
        <section className="section-search">


          <article className="article-search">

            <div className="article-search-div1">


            </div>

            <h1 className="h1">404! Não encontrado</h1>
            <h2 className="h2">Consulte o valor de um carro de forma gratuita</h2>


            <div className="consulte-tambem">
              <p className="por">Consulte também por:</p>
              <div className="links">
                <Link href="/carros" legacyBehavior>
                  <a className="link">Tabela Fipe Carros </a>
                </Link>
                <p className="espacos">,</p>
                <Link href="/motos" className="link">
                  Tabela Fipe Motos 
                </Link>
                <p className="espacos">&nbsp;e</p>
                <Link href="/caminhoes" className="link">
                  Tabela Fipe Caminhões 
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>


    </React.Fragment>
  );
}
