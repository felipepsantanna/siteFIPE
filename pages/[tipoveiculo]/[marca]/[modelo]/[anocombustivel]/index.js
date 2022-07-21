import React from 'react';
import Link from 'next/link';
import Header from '/src/components/header';
import Api from '/src/controllers/frontend';
import Helper from '/src/controllers/helper';

export default function AnoCombustivel({ fipe }) {
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
                                <Link href={"/" + Helper.LabelTipoVeiculo(fipe.tipoVeiculo).toLowerCase()}>
                                    <a>
                                        <div className="breadcrumb-links">{Helper.LabelTipoVeiculo(fipe.tipoVeiculo)}</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <Link href={"/" + Helper.LabelTipoVeiculo(fipe.tipoVeiculo).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelMarca).toLowerCase()}>
                                    <a>
                                        <div className="breadcrumb-links">{fipe.labelMarca}</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <Link href={"/" + Helper.LabelTipoVeiculo(fipe.tipoVeiculo).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelMarca).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelModelo).toLowerCase()}>
                                    <a>
                                        <div className="breadcrumb-links">{fipe.labelModelo}</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{fipe.labelAno}</div>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="h1">Tabela Fipe {fipe.labelMarca} {fipe.labelModelo} {fipe.labelAno}</h1>
                    <h2 className="h2">Este é o preço de compra do veículo</h2>

                    <p className="valor">{fipe.valor}</p>
                    {/*}
                    <p className="mes-referencia">Mês de referência: {fipe.mesReferencia}</p>
                    {*/}
                    <p className="mes-referencia">Mês de referência: Julho 2022</p>
                </article>
            </section>
        </div>
    </React.Fragment>
}

export async function getServerSideProps(context) {

    const url = await Helper.createURL(context.params.tipoveiculo, context.params.marca, context.params.modelo, context.params.anocombustivel)

    const api = new Api();
    await api.getUrlFipe(url);

    const fipe = api.Fipe[0];

    return {
        props: {
            fipe
        }
    }
}

