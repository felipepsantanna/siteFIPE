import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Api from '/src/controllers/frontend';


export default function Related({ title, lista }) {

    return (
        <React.Fragment>


<h3 className="pl-16">Outros modelos da {title}</h3>
<ul className="lista-modelos">
                {
                   lista && lista.map(r => {
                        return <li key={r.codigoAno}>
                            <Link href={r.URL} legacyBehavior>
                                <a>
                                    <div className="item-modelo">
                                        <div className="item-modelo-marca">
                                            <p>{r.labelMarca + ' ' + r.labelModelo + r.labelAno}</p>
                                        </div>
                                        <div className="item-modelo-img">
                                            <div>
                                                <img alt={r.labelMarca + ' ' + + r.labelModelo + r.labelAno} src="/carros.png" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    })
                }


            </ul>
        </React.Fragment>
    );
}

