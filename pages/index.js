import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from '/src/components/head';
import Api from '/src/controllers/frontend';
import Header from '/src/components/header';
import Helper from '/src/controllers/helper';

export default function Home() {

  const [mesReferencia, setMesReferencia] = useState();
  const [tipoVeiculo, setTipoVeiculo] = useState(1);
  const [marcaVeiculo, setMarcaVeiculo] = useState(0);
  const [modeloVeiculo, setModeloVeiculo] = useState(0);
  const [anoVeiculo, setAnoVeiculo] = useState(0);
  const [urlFIPE, setUrlFIPE] = useState("/");

  const [listaMarcaVeiculo, setListaMarcaVeiculo] = useState();
  const [listaModeloVeiculo, setListaModeloVeiculo] = useState();
  const [listaAnoVeiculo, setListaAnoVeiculo] = useState();

  const [disabledMarcaVeiculo, setDisabledMarcaVeiculo] = useState(true);
  const [disabledModeloVeiculo, setDisabledModeloVeiculo] = useState(true);
  const [disabledAnoVeiculo, setDisabledAnoVeiculo] = useState(true);

  const [allItens, setAllItens] = useState();

  useEffect(() => {

    async function fetchMyAPI() {
      const api = new Api();
      await api.getMesReferencia();

      setMesReferencia(api.mesReferencia);
      await api.getMarcas(api.mesReferencia.Codigo, tipoVeiculo);
      setListaMarcaVeiculo(api.marcas);

    }

    fetchMyAPI();

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

    const button = document.getElementById('btnConsultarPreco');
    button.classList.add('Mui-disabled');
  }


  const onClickTiposVeiculos = async (e) => {

    const newTipoVeiculo = e.currentTarget.getAttribute('data-value')
    setTipoVeiculo(newTipoVeiculo)
    clean(e);
    const clickable = document.getElementsByClassName('MuiChip-clickable');

    Array.prototype.forEach.call(clickable, function (element) {
      //MuiChip-outlined MuiChip-outlinedSecondary
      element.classList.remove('MuiChip-outlined');
      element.classList.remove('MuiChip-outlinedSecondary');
      element.classList.remove('MuiChip-colorSecondary');
      element.classList.add('MuiChip-outlined');
      element.classList.add('MuiChip-outlinedSecondary');
    });

    e.currentTarget.classList.remove('MuiChip-outlined');
    e.currentTarget.classList.remove('MuiChip-outlinedSecondary');
    e.currentTarget.classList.add('MuiChip-colorSecondary');

    const api = new Api();
    await api.getMarcas(mesReferencia.Codigo, newTipoVeiculo);
    setListaMarcaVeiculo(api.marcas);


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

          <div className="article-search-div1">


          </div>

          <h1 className="h1">Tabela Fipe de Carros</h1>
          <h2 className="h2">Consulte o valor de um carro de forma gratuita</h2>



          <div className="box">
            <h2 className="h2">Qual veículo você gostaria de comprar ou vender?</h2>
            <div className="tipoVeiculo">
              <div className="MuiButtonBase-root MuiChip-root button MuiChip-colorSecondary MuiChip-clickableColorSecondary MuiChip-clickable" role="button" onClick={(e) => onClickTiposVeiculos(e)} data-value="1">
                <span className="MuiChip-label">Carro</span>
                <span className="MuiTouchRipple-root"></span>
              </div>
              <div className="MuiButtonBase-root MuiChip-root button MuiChip-clickableColorSecondary MuiChip-outlined MuiChip-outlinedSecondary MuiChip-clickable" role="button" onClick={(e) => onClickTiposVeiculos(e)} data-value="2">
                <span className="MuiChip-label">Moto</span>
                <span className="MuiTouchRipple-root"></span>
              </div>
              <div className="MuiButtonBase-root MuiChip-root button MuiChip-clickableColorSecondary MuiChip-outlined MuiChip-outlinedSecondary MuiChip-clickable" role="button" onClick={(e) => onClickTiposVeiculos(e)} data-value="3">
                <span className="MuiChip-label">Caminhão</span>
                <span className="MuiTouchRipple-root"></span>
              </div>
            </div>
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
        </article>
      </section>
    </div>


  </React.Fragment>
}
