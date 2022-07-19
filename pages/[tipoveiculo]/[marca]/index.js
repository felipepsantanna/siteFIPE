import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Api from '/src/controllers/frontend';
import Modelos from '/src/components/modelos';
import Head from '/src/components/head';
import Header from '/src/components/header';

export default function AnoCombustivel({ marca }) {
    return <React.Fragment>

<Head title={"Tabela Fipe " + marca.Label}  description={"Consulte o preço de carros novos e usados da " + marca.Label} />
        <Header title />

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
                                <Link href={"/" + marca.tipo}>
                                    <a>
                                        <div className="breadcrumb-links">{marca.tipo}</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{marca.Label}</div>
                            </li>
                        </ol>
                    </nav>

                    <div className="logo-marca">
                        <img
                            src={"/marcas/" + marca.Value + ".png"}
                            alt={marca.Label}
                            width={110}
                            height={110}
                        />
                    </div>

                    <h1 className="h1">Tabela Fipe {marca.Label} </h1>
                    <h2 className="h2">Consulte o preço de carros novos e usados da {marca.Label}</h2>

                    <Modelos marca={marca} />

                </article>
            </section>
        </div>
    </React.Fragment>
}


export async function getServerSideProps(context) {
    
    const api = new Api();
    const marca = await api.getMarcasID(context.params.tipoveiculo, context.params.marca.replace('-', ' '));

    return {
        props: {
            marca
        }
    }

    //await api.getModelos(api.mesReferencia.Codigo, IDtipoVeiculo, 23);

   /* 
    const labelTipoVeiculo = context.params.tipoveiculo;
    const labelMarca = context.params.marca;
    const IDtipoVeiculo = Helper.IDTipoVeiculo(context.params.tipoveiculo);
    const api = new Api();
    await api.getModelos(api.mesReferencia.Codigo, IDtipoVeiculo, 23);
    let listaModelos = [];
    let auxArr = []
    if (api.modelos) {
        for (var i = 0; i < api.modelos.length; i++) {
            if (!auxArr.includes(api.modelos[i].codigoModelo)) {
                auxArr.push(api.modelos[i].codigoModelo);
                listaModelos.push(api.modelos[i]);
            }
        }
    }


    return {
        props: {
            IDtipoVeiculo,
            labelTipoVeiculo,
            labelMarca,
            listaModelos
        }
    }*/
}

