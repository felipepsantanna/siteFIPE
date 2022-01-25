import React from 'react';
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
                                <a href="https://www.mobiauto.com.br/">
                                    <div className="breadcrumb-inicio">Início</div>
                                </a>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{Helper.LabelTipoVeiculo(fipe.tipoVeiculo)}</div>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{fipe.labelMarca}</div>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">{fipe.labelModelo}</div>
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
                    <p className="mes-referencia">Mês de referência: {fipe.mesReferencia}</p>

                </article>
            </section>
        </div>
    </React.Fragment>
}

export async function getServerSideProps(context) {
    const url = await Helper.createURL(context.params.tipoveiculo, context.params.marca, context.params.modelo, context.params.anocombustivel)
    const api = new Api();
    await api.getUrlFipe(url);
    console.log(url);
    const fipe = api.Fipe[0];
    console.log(fipe)
    return {
        props: {
            fipe
        }
    }
}

