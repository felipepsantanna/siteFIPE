import React from 'react';
import Header from '/src/components/header';

export default function AnoCombustivel() {
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
                                <div className="breadcrumb-links">Carros</div>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">Renault</div>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">Clio</div>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">2012 Gasolina</div>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="h1">Tabela Fipe Renault Clio 2012 Gasolina</h1>
                    <h2 className="h2">Este é o preço de compra do veículo</h2>

                    <p className="valor">R$&nbsp;55.460</p>
                    <p className="mes-referencia">Mês de referência: Janeiro de 2022</p>

                </article>
            </section>
        </div>
    </React.Fragment>
}

