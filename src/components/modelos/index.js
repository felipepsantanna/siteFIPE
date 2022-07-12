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
                            <Link href={m.URL}>
                                <a>
                                    <div className="item-modelo">
                                        <div className="item-modelo-marca">
                                            <p> {m.labelModelo}</p>
                                            <i>{m.labelAno}</i>
                                        </div>
                                        <div className="item-modelo-img">
                                            <div>
                                                <img alt={m.labelModelo} src="/carros.png" />
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

