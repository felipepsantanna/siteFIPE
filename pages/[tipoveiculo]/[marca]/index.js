import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Api from '/src/controllers/frontend';
import Modelos from '/src/components/modelos';
import Header from '/src/components/header';
import Helper from '/src/controllers/helper';

export default function AnoCombustivel({ IDtipoVeiculo, labelTipoVeiculo, labelMarca, listaModelos }) {
    return <React.Fragment>
        <Header />

        <div id="section-wrapper" className="sectionWrapper">
            <section className="section-search">


                <article className="article-search">
                    <nav className="MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                        <ol className="MuiBreadcrumbs-ol">
                            <li className="MuiBreadcrumbs-li">
                                <Link href="/">
                                    <a>
                                        <div className="breadcrumb-inicio">Início</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <Link href={"/" + labelTipoVeiculo}>
                                    <a>
                                        <div className="breadcrumb-links">{labelTipoVeiculo}</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{labelMarca}</div>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="h1">Tabela Fipe {labelMarca} </h1>
                    <h2 className="h2">Consulte o preço de carros novos e usados da {labelMarca}</h2>

                    <Modelos listaModelos={listaModelos} />

                </article>
            </section>
        </div>
    </React.Fragment>
}


export async function getServerSideProps(context) {

    const IDtipoVeiculo = Helper.IDTipoVeiculo(context.params.tipoveiculo);
    const labelTipoVeiculo = context.params.tipoveiculo;
    const labelMarca = context.params.marca;

    const api = new Api();
    await api.getModelos(api.mesReferencia.Codigo, IDtipoVeiculo, 23);
    let listaModelos = [];
    let auxArr = []
    for (var i = 0; i < api.modelos.length; i++) {
        if (!auxArr.includes(api.modelos[i].codigoModelo)) {
            auxArr.push(api.modelos[i].codigoModelo);
            listaModelos.push(api.modelos[i]);
        }
    }


    return {
        props: {
            IDtipoVeiculo,
            labelTipoVeiculo,
            labelMarca,
            listaModelos
        }
    }
}

