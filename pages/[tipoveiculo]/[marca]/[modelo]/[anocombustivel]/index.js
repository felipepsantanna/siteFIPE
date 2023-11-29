import React from 'react';
import Link from 'next/link';
import Head from '/src/components/head';
import Header from '/src/components/header';
import Related from '/src/components/related';
import Api from '/src/controllers/frontend';
import Helper from '/src/controllers/helper';
import Grafico from '/src/components/chart';


export default function AnoCombustivel({ fipe, chartData, listRelated, url, scheme }) {
    return (
        <React.Fragment>
            <Head
                title={"Tabela Fipe " + fipe.labelMarca + " " + fipe.labelModelo + " " + fipe.labelAno}
                description={"Na Tabela FIPE do " + fipe.labelMarca + " " + fipe.labelModelo + " " + fipe.labelAno + " você pode consultar de maneira rápida e prática preços de " + fipe.labelMarca + " novos e usados. Confira já!"}
                url={url}
                scheme={scheme} />
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

                <Related title={fipe.labelMarca + ' ' + fipe.labelModelo} lista={listRelated}></Related>

            </div>
        </React.Fragment>
    );
}

export async function getServerSideProps(context) {

    const url = "https://tabelafipe.blog.br" + context.resolvedUrl;
    const api = new Api();
    await api.getUrlFipe(context.resolvedUrl);

    if (api.Fipe === null || api.Fipe.length == 0) {
        return {
            notFound: true // Return the notFound property to trigger a 404 response
        };
    }
    

    

    const fipe = api.Fipe[0];
    const reverseFipe = api.Fipe.reverse();
    const urlQuebrada = fipe.URL.split('/');

    const positions = {
        //tipo: carro / moto / caminhão
        position1: {
            name: `${Helper.LabelTipoVeiculo(fipe.tipoVeiculo).toLowerCase()}`,
            id: `/${Helper.LabelTipoVeiculoURL(fipe.tipoVeiculo).toLowerCase()}`
        },
        //marca: bmw / ford
        position2: {
            name: `${fipe.labelMarca}`,
            id: `/${urlQuebrada[1]}/${urlQuebrada[2]}`
        },
        //modelo: palio weekned
        position3: {
            name: `${fipe.labelMarca} ${fipe.labelModelo}`,
            id: `/${urlQuebrada[1]}/${urlQuebrada[2]}/${urlQuebrada[3]}`
        },
        //0km gasolina
        position4: {
            name: `Tabela Fipe ${fipe.labelMarca} ${fipe.labelModelo} ${fipe.labelAno}`,
            id: fipe.URL
        },
    };

    const scheme = `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"position":1,"@type":"ListItem","item":{"@id":"${positions.position1.id}","name":"${positions.position1.name}":"","image":null}},{"position":2,"@type":"ListItem","item":{"@id":"${positions.position2.id}","name":"${positions.position2.name}":"","image":null}},{"position":3,"@type":"ListItem","item":{"@id":"${positions.position3.id}","name":"${positions.position3.name}":"","image":null}},{"position":4,"@type":"ListItem","item":{"@id":"${positions.position4.id}","name":"${positions.position4.name}","image":null}}]}`;

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

    await api.getRelated(fipe.codigoMesReferencia, fipe.tipoVeiculo, fipe.codigoMarca, fipe.codigoModelo, fipe.codigoAno);
    const listRelated = api.related;



    return {
        props: {
            fipe,
            chartData,
            listRelated,
            url,
            scheme
        }
    }
}

