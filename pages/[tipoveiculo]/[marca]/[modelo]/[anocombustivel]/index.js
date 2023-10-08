import React from 'react';
import Link from 'next/link';
import Head from '/src/components/head';
import Header from '/src/components/header';
import Related from '/src/components/related';
import Api from '/src/controllers/frontend';
import Helper from '/src/controllers/helper';
import Grafico from '/src/components/chart';


export default function AnoCombustivel({ fipe, chartData }) {
    return (
        <React.Fragment>
            <Head title={"Tabela Fipe " + fipe.labelMarca + " " + fipe.labelModelo + " " + fipe.labelAno} description={"Na Tabela FIPE do " + fipe.labelMarca + " " + fipe.labelModelo + " " + fipe.labelAno + " você pode consultar de maneira rápida e prática preços de " + fipe.labelMarca + " novos e usados. Confira já!"} />
            <Header />

            <div id="section-wrapper" className="sectionWrapper">
                <section className="section-search">


                    <article className="article-search">
                        <nav className="MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                            <ol className="MuiBreadcrumbs-ol">
                                <li className="MuiBreadcrumbs-li">
                                    <Link href="https://tabelafipe.blog.br" legacyBehavior>
                                        <div className="breadcrumb-links">Tabela Fipe</div>
                                    </Link>
                                </li>
                                <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                                <li className="MuiBreadcrumbs-li">
                                    <Link
                                        href={"/" + Helper.LabelTipoVeiculoURL(fipe.tipoVeiculo).toLowerCase()}
                                        legacyBehavior>
                                        <div className="breadcrumb-links">{Helper.LabelTipoVeiculo(fipe.tipoVeiculo)}</div>
                                    </Link>
                                </li>
                                <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                                <li className="MuiBreadcrumbs-li">
                                    <Link
                                        href={"/" + Helper.LabelTipoVeiculoURL(fipe.tipoVeiculo).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelMarca).toLowerCase()}
                                        legacyBehavior>
                                        <div className="breadcrumb-links">{fipe.labelMarca}</div>
                                    </Link>
                                </li>
                                <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                                <li className="MuiBreadcrumbs-li">
                                    <Link
                                        href={"/" + Helper.LabelTipoVeiculoURL(fipe.tipoVeiculo).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelMarca).toLowerCase() + "/" + Helper.NormalizeURL(fipe.labelModelo).toLowerCase()}
                                        legacyBehavior>
                                        <div className="breadcrumb-links">{fipe.labelModelo}</div>
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

                        <p className="mes-referencia">Mês de referência: {fipe.mesReferencia}</p>

                        {/*}<p className="mes-referencia">Mês de referência: Dezembro 2022</p>{*/}
                    </article>
                </section>

                <Grafico chartData={chartData} />

                <Related codigoMesReferencia={fipe.codigoMesReferencia} tipoVeiculo={fipe.tipoVeiculo} codigoMarca={fipe.codigoMarca} codigoModelo={fipe.codigoModelo} codigoAno={fipe.codigoAno}></Related>

            </div>
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {

    const url = await Helper.createURL(context.params.tipoveiculo, context.params.marca, context.params.modelo, context.params.anocombustivel)


    const api = new Api();
    await api.getUrlFipe(url);

    if (api.Fipe === null || api.Fipe.length == 0) {
        return {
            notFound: true // Return the notFound property to trigger a 404 response
        };
    }


    const fipe = api.Fipe[0];
    const reverseFipe = api.Fipe.reverse();

    const chartData = {
        labels: reverseFipe.map(item => item.mesReferencia),
        datasets: [
            {
                label: 'Histórico de preços Fipe',
                data: reverseFipe.map(item => Number(item.valor.replace('.', '').replace(',', '.').replace('R$ ', ''))),
                backgroundColor: 'rgb(0, 154, 138)'
            }
        ]
    };
    return {
        props: {
            fipe,
            chartData
        }
    }
}

