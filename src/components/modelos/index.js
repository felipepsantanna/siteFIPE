import React from 'react';
import Link from 'next/link';
import Helper from '/src/controllers/helper';


export default function Modelos({ listaModelos }) {

    return (
        <React.Fragment>
            <ul className="lista-modelos">

                {
                    listaModelos && listaModelos.map(m => {
                        return <li key={m.codigoModelo}>
                            <Link href="/tabela-fipe/carros/volkswagen/gol">
                                <a>
                                    <div className="item-modelo">
                                        <div className="item-modelo-marca">
                                            <p> {m.labelModelo}</p>
                                        </div>
                                        <div className="item-modelo-img">
                                            <div>
                                                <img alt={m.labelModelo} src="/marcas/default.png" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    })
                }


            </ul>
        </React.Fragment >
    );
}

