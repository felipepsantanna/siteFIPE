import React from 'react';



export default function ConsulteTambem() {
    return (
        <React.Fragment>
            <div className="consulte-tambem">
                <p className="por">Consulte também por:</p>
                <div className="links">

                    <a href="/carros" className="link">Tabela Fipe Carros </a>

                    <p className="espacos">,</p>

                    <a href="/motos" className="link">Tabela Fipe Motos </a>

                    <p className="espacos">&nbsp;e</p>

                    <a href="/caminhoes" className="link">Tabela Fipe Caminhões </a>

                </div>
            </div>
        </React.Fragment>
    );
}

