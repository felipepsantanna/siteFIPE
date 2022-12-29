import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Api from '/src/controllers/frontend';


export default function Related({ codigoMesReferencia, tipoVeiculo, codigoMarca, codigoModelo, codigoAno }) {

    const [listaRelated, setListaRelated] = useState(null);

    useEffect(() => {
        async function loadRelated() {
            const api = new Api();

            await api.getRelated(codigoMesReferencia, tipoVeiculo, codigoMarca, codigoModelo, codigoAno);
            setListaRelated(api.related);
        }

        loadRelated();
    }, []);


    return (
        <React.Fragment>
            <div className="consulte-tambem">
                <p className="por">Outros anos</p>
                <div className="links">

                    {
                        listaRelated && listaRelated.map(r => {
                            return <Link key={r.codigoAno} href={r.URL}>
                                <a className="link">{r.labelMarca} &nbsp;{r.labelModelo} &nbsp;{r.labelAno}&nbsp; </a>
                            </Link>
                        })
                    }

                </div>
            </div>
        </React.Fragment>
    );
}

