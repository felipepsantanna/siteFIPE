import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Marcas() {
    return (
        <React.Fragment>
            <section className="section-marcas">
                <article>
                    <h2>Escolha uma marca de carro</h2>

                    <div className="busca">
                        <div className="busca2">
                            <input aria-invalid="false" type="text" className="form-control" placeholder="Busca por marca" />


                        </div>
                    </div>

                    <div className="lista-marcas">
                        <div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="marca">
                                <Link href="/carros/caoa-chery">
                                    <a>
                                        <div className="all">
                                            <div>
                                                <img alt="Caoa Cherry" src="/marcas/161.png" />
                                            </div>
                                            <p className="jss1170 jss2247">CAOA Chery</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                </article>

            </section>
        </React.Fragment >
    );
}

