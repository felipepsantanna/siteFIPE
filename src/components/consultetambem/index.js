import React from 'react';
import Link from 'next/link';


export default function ConsulteTambem() {
    return (
        <React.Fragment>
            <div className="consulte-tambem">
                <p className="por">Consulte também por:</p>
                <div className="links">
                    <Link href="/carros" className="link">
                        Tabela Fipe Carros 
                    </Link>
                    <p className="espacos">,</p>

                    <Link href="/motos" className="link">
                        Tabela Fipe Motos 
                    </Link>
                    <p className="espacos">&nbsp;e</p>
                    <Link href="/caminhoes" className="link">
                        Tabela Fipe Caminhões 
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}

