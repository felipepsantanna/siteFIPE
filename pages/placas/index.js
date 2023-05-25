import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from '/src/components/head';
import Api from '/src/controllers/frontend';
import Header from '/src/components/header';
import Helper from '/src/controllers/helper';

export default function Home() {


    const onClick = async (e) => {
        /*const vehicle = await sinespApi.search('HNO9172');
        */
    }

    return (
        <React.Fragment>
            <Head title="Tabela FIPE: Preços de carros novos e usados" description="Tabela FIPE atualizada até Junho de 2022. Consulte carros, motos e caminhões por marca, modelo e ano. Veja os valores dos anos anteriores." />
            <Header />

            <div id="section-wrapper" className="sectionWrapper">
                <section className="section-search">


                    <article className="article-search">

                        <div className="article-search-div1">


                        </div>

                        <h1 className="h1">Placa Fipe</h1>

                        <div className="box">
                            <h2 className="h2">Digite a placa que você quer consultar</h2>

                            <div className="dropboxes">

                                <input className="form-control" id="sPlaca" pattern="^[A-Za-z]{3}[0-9]{4}$|^[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}$" type="text" maxLength="7" size="7" placeholder="Placa" required="required" />

                            </div>
                            <div className="consultarPrecos">

                                <button id="btnConsultarPreco" className="MuiButtonBase-root MuiButton-root jss290 MuiButton-contained jss291 MuiButton-fullWidth" type="button">
                                    Consultar
                                </button>

                            </div>
                        </div>




                        <div className="consulte-tambem">
                            <p className="por">Consulte também por:</p>
                            <div className="links">
                                <Link href="/carros" className="link">
                                    Tabela Fipe Carros 
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

            <div id="section-wrapper" className="sectionWrapper">
                <section className="section-search">


                </section>
            </div>

        </React.Fragment>
    );
}
