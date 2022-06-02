import React from 'react';
import Link from 'next/link';


export default function ConsulteTambem() {
    return (
        <React.Fragment>
            <div className="consulte-tambem">
                <p className="por">Consulte também por:</p>
                <div className="links">
                    <Link href="/carros">
                        <a className="link">Tabela Fipe Carros </a>
                    </Link>
                    <p className="espacos">,</p>

                    <Link href="/motos">
                        <a className="link">Tabela Fipe Motos </a>
                    </Link>
                    <p className="espacos">&nbsp;e</p>
                    <Link href="/caminhoes">
                        <a className="link">Tabela Fipe Caminhões </a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}

