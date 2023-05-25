import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Api from '/src/controllers/frontend';
import Helper from '/src/controllers/helper';

export default function Modelos({ marca }) {
    const [listaModelos, setListaModelos] = useState(null);
    useEffect(() => {
        async function loadModelos() {
            const api = new Api();
            const IDtipoVeiculo = Helper.IDTipoVeiculo(marca.tipo);
            await api.getModelos(api.mesReferencia.Codigo, IDtipoVeiculo, marca.Value);
            setListaModelos(api.modelos);
        }

        loadModelos();
    }, []);


    return (
        <React.Fragment>
            <ul className="lista-modelos">

                {
                    listaModelos && listaModelos.map(m => {
                       
                        return <li key={m.codigoModelo}>
                            <Link href={m.URL} legacyBehavior>
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

