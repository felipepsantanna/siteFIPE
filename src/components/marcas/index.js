import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Helper from '/src/controllers/helper';
import ImageHelper from '/src/controllers/helper/img';


export default function Marcas({ labelTipoVeiculo, listaMarcaVeiculo, UmUmaLabelTipoVeiculo, LabelSingulgarTipoVeiculo }) {

    return (
        <React.Fragment>
            <section className="section-marcas">
                <article>
                    <h2>Escolha a marca de {UmUmaLabelTipoVeiculo} {LabelSingulgarTipoVeiculo}</h2>

                    { /*}
                    <div className="busca">
                        <div className="busca2">
                            <input aria-invalid="false" type="text" className="form-control" placeholder="Busca por marca" />


                        </div>
                    </div>
                    { */}
                    <div className="lista-marcas">
                        <div>


                            {
                                listaMarcaVeiculo && listaMarcaVeiculo.map(m => {
                                    return <div key={m.Value} className="marca">
                                        <Link href={"/" + labelTipoVeiculo + "/" + Helper.NormalizeURL(m.Label)} legacyBehavior>
                                            <a>
                                                <div className="all">
                                                    <div>

                                                        <Image
                                                            src={ImageHelper.LogoDasMarcas(m.Value, labelTipoVeiculo)}
                                                            alt={m.Label}
                                                            width={96}
                                                            height={96}
                                                        />

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

