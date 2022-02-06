import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Api from '/src/controllers/frontend';
import Marcas from '/src/components/marcas';
import Header from '/src/components/header';
import Consulte from '/src/components/consultetambem';
import Helper from '/src/controllers/helper';

export async function getServerSideProps(context) {

    const tipoVeiculo = Helper.IDTipoVeiculo(context.params.tipoveiculo);
    const labelTipoVeiculo = context.params.tipoveiculo;

    const api = new Api();
    await api.getMesReferencia();

    await api.getMarcas(api.mesReferencia.Codigo, tipoVeiculo);
    const baseMesReferencia = api.mesReferencia;

    const marcas = api.marcas;

    return {
        props: {
            tipoVeiculo,
            labelTipoVeiculo,
            baseMesReferencia,
            marcas
        }
    }
}

export default function TipoVeiculo({ tipoVeiculo, labelTipoVeiculo, baseMesReferencia, marcas }) {

    const [mesReferencia, setMesReferencia] = useState(baseMesReferencia);
    const [codigoTipoVeiculo, setCodigoTipoVeiculo] = useState(tipoVeiculo);
    const [marcaVeiculo, setMarcaVeiculo] = useState(0);
    const [modeloVeiculo, setModeloVeiculo] = useState(0);
    const [anoVeiculo, setAnoVeiculo] = useState(0);
    const [urlFIPE, setUrlFIPE] = useState("/");

    const [listaMarcaVeiculo, setListaMarcaVeiculo] = useState(marcas);
    const [listaModeloVeiculo, setListaModeloVeiculo] = useState();
    const [listaAnoVeiculo, setListaAnoVeiculo] = useState();

    const [disabledMarcaVeiculo, setDisabledMarcaVeiculo] = useState(true);
    const [disabledModeloVeiculo, setDisabledModeloVeiculo] = useState(true);
    const [disabledAnoVeiculo, setDisabledAnoVeiculo] = useState(true);

    const [allItens, setAllItens] = useState();


    useEffect(() => {

        setListaMarcaVeiculo(marcas);


    }, []);

    const clean = async (e) => {
        setDisabledModeloVeiculo(true);
        setDisabledAnoVeiculo(true);

        setListaMarcaVeiculo();
        setListaModeloVeiculo();
        setListaAnoVeiculo();

        setMarcaVeiculo(0);
        setModeloVeiculo(0);
        setAnoVeiculo(0);

        document.getElementById('marcaVeiculo').value = 0;
        document.getElementById('modeloVeiculo').value = 0;
        document.getElementById('anoVeiculo').value = 0;
    }

    const onMarcasChange = async (e) => {

        const newMarcaVeiculo = e.currentTarget.value;
        setMarcaVeiculo(newMarcaVeiculo);
        const api = new Api();

        await api.getModelos(mesReferencia.Codigo, tipoVeiculo, newMarcaVeiculo);
        setAllItens(api.modelos);

        let uniqueArr = [];
        let auxArr = []
        for (var i = 0; i < api.modelos.length; i++) {
            if (!auxArr.includes(api.modelos[i].codigoModelo)) {
                auxArr.push(api.modelos[i].codigoModelo);
                uniqueArr.push(api.modelos[i]);
            }
        }
        setListaModeloVeiculo(uniqueArr);
        setDisabledModeloVeiculo(false);

    }

    const onModeloChange = async (e) => {
        const newModeloVeiculo = e.currentTarget.value;
        setModeloVeiculo(newModeloVeiculo);

        var filterModelos = allItens.filter(modelo => modelo.codigoModelo == newModeloVeiculo);

        setListaAnoVeiculo(filterModelos);
        setDisabledAnoVeiculo(false);
    }

    const onAnoChange = async (e) => {

        const button = document.getElementById('btnConsultarPreco');
        button.classList.remove('Mui-disabled');

        const marcaVeiculo = document.getElementById('marcaVeiculo');
        const modeloVeiculo = document.getElementById('modeloVeiculo');


        const labelMarca = marcaVeiculo.options[marcaVeiculo.selectedIndex].text;
        const labelModelo = modeloVeiculo.options[modeloVeiculo.selectedIndex].text;
        const labelAno = e.currentTarget.options[e.currentTarget.selectedIndex].text;
        const urlPreco = await Helper.createURL(tipoVeiculo, labelMarca, labelModelo, labelAno)
        setUrlFIPE(urlPreco);
    }


    return <React.Fragment>
        <Header />

        <div id="section-wrapper" className="sectionWrapper">
            <section className="section-search">


                <article className="article-search">

                    <nav className="MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                        <ol className="MuiBreadcrumbs-ol">
                            <li className="MuiBreadcrumbs-li">
                                <Link href="/">
                                    <a>
                                        <div className="breadcrumb-inicio">Tabela Fipe</div>
                                    </a>
                                </Link>
                            </li>
                            <li aria-hidden="true" className="MuiBreadcrumbs-separator">/</li>
                            <li className="MuiBreadcrumbs-li">
                                <div className="breadcrumb-links">Tabela Fipe {Helper.CapitalizeFirstLetter(labelTipoVeiculo)}</div>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="h1">Tabela Fipe de Carros</h1>
                    <h2 className="h2">Consulte o valor de um carro de forma gratuita</h2>



                    <div className="box">
                        <h2 className="h2">Qual veículo você gostaria de comprar ou vender?</h2>
                        <div className="dropboxes">
                            <select defaultValue={marcaVeiculo} name="marcaVeiculo" id="marcaVeiculo" className="form-control" data-size="7" data-style="btn btn-simple btn-round" title="marca Veiculo" onChange={(e) => onMarcasChange(e)}>
                                <option value="0" disabled>Marcas</option>
                                {listaMarcaVeiculo &&
                                    listaMarcaVeiculo.map((element) => {
                                        return <option key={element.Value} value={element.Value}>{element.Label}</option>
                                    })
                                }
                            </select>

                            <select defaultValue={modeloVeiculo} name="modeloVeiculo" id="modeloVeiculo" className="form-control" data-size="7" data-style="btn btn-simple btn-round" title="Modelo Veiculo" onChange={(e) => onModeloChange(e)} disabled={disabledModeloVeiculo}>
                                <option value="0" disabled>Modelo</option>
                                {listaModeloVeiculo &&
                                    listaModeloVeiculo.map((element) => {
                                        return <option key={element.codigoModelo} value={element.codigoModelo}>{element.labelModelo}</option>
                                    })
                                }
                            </select>

                            <select defaultValue={anoVeiculo} name="anoVeiculo" id="anoVeiculo" className="form-control" data-size="7" data-style="btn btn-simple btn-round" title="Ano Veiculo" onChange={(e) => onAnoChange(e)} disabled={disabledAnoVeiculo}>
                                <option value="0" disabled>Ano e combustível</option>
                                {listaAnoVeiculo &&
                                    listaAnoVeiculo.map((element) => {
                                        return <option key={element.codigoAno} value={element.codigoAno}>{element.labelAno}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="consultarPrecos">
                            <Link href={urlFIPE}>
                                <a id="btnConsultarPreco" className="MuiButtonBase-root MuiButton-root jss290 MuiButton-contained jss291 MuiButton-fullWidth Mui-disabled" type="button" >
                                    <span className="MuiButton-label">Consultar preço</span>
                                    <span className="MuiTouchRipple-root"></span>
                                </a>
                            </Link>
                        </div>
                    </div>




                    <Consulte />
                </article>
            </section>

            <Marcas labelTipoVeiculo={labelTipoVeiculo} listaMarcaVeiculo={listaMarcaVeiculo} />
        </div>


    </React.Fragment>
}


