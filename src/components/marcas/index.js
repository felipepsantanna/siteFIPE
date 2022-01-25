import React from 'react';
import Link from 'next/link';
import Helper from '/src/controllers/helper';


export default function Marcas({ tipoveiculo, listaMarcaVeiculo }) {

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


                            {
                                listaMarcaVeiculo && listaMarcaVeiculo.map(m => {
                                    return <div key={m.Value} className="marca">
                                        <Link href={"/carros/" + Helper.NormalizeURL(m.Label)}>
                                            <a>
                                                <div className="all">
                                                    <div>
                                                        <img alt={m.Label} src={"/marcas/" + m.Value + ".png"} onError={(e) => { e.target.onerror = null; e.target.src = "/marcas/default.png" }} />
                                                    </div>
                                                    <p className="jss1170 jss2247">{m.Label}</p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                })
                            }




                        </div>
                    </div>

                </article>

            </section>
        </React.Fragment >
    );
}

