import React, { useState, useEffect } from 'react';
import Head from '/src/components/head';
import Api from '/src/controllers/frontend';

export default function Home() {

  const [mesReferencia, setMesReferencia] = useState();
  const [tipoVeiculo, setTipoVeiculo] = useState(1);
  const [marcaVeiculo, setMarcaVeiculo] = useState(0);
  const [modeloVeiculo, setModeloVeiculo] = useState(0);
  const [anoVeiculo, setAnoVeiculo] = useState(0);

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

    let uniqueArr = [];
    let auxArr = []

    const filterModelos = await listaModeloVeiculo.filter(m => {
      return (m.codigoModelo == newModeloVeiculo)
    })

    for (var i = 0; i < filterModelos.length; i++) {
      if (!auxArr.includes(filterModelos.codigoAno)) {
        auxArr.push(filterModelos.codigoAno);
        uniqueArr.push(filterModelos[i]);
      }
    }

    setListaAnoVeiculo(uniqueArr);
    setDisabledAnoVeiculo(false);
  }


  return <React.Fragment>
    <div id="header-wrapper" className="headerWrapper">
      <header className="header">
        <a className="svgRoot-link" href="https://google.com">
          <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 165 22" aria-hidden="true">
            <svg width="165" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M155 2c-5.506 0-10 4.466-10 10 0 5.506 4.466 10 10 10 5.506 0 10-4.466 10-10s-4.466-10-10-10zm0 14.972c-2.753 0-5-2.247-5-5s2.247-5 5-5 5 2.247 5 5c0 2.78-2.247 5-5 5zM140.472 2H125.5a2.508 2.508 0 00-2.5 2.504 2.508 2.508 0 002.5 2.503h5v12.49A2.508 2.508 0 00133 22c1.376 0 2.5-1.125 2.5-2.503V7.007h5c1.376 0 2.5-1.125 2.5-2.503C142.972 3.125 141.848 2 140.472 2z" fill="#00B2A9"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M102.5 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm15 2c-1.376 0-2.5 1.168-2.5 2.6 0 2.863-2.247 5.2-5 5.2s-5-2.337-5-5.2c0-1.431-1.124-2.6-2.5-2.6s-2.5 1.168-2.5 2.6c0 5.726 4.466 10.4 10 10.4 5.506 0 10-4.645 10-10.4 0-1.46-1.124-2.6-2.5-2.6zm2.5-4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" fill="#00B2A9"></path>
              <path d="M87 2c-5.506 0-10 4.466-10 10 0 5.506 4.466 10 10 10 1.91 0 3.708-.534 5.225-1.489.393.871 1.264 1.489 2.275 1.489 1.376 0 2.5-1.124 2.5-2.5v-7.528C97 6.466 92.534 2 87 2zm0 14.972c-2.753 0-5-2.247-5-5s2.247-5 5-5 5 2.247 5 5c0 2.78-2.247 5-5 5z" fill="#00B2A9"></path>
              <path d="M71.5 2A2.507 2.507 0 0069 4.504v14.993A2.507 2.507 0 0071.5 22c1.376 0 2.5-1.125 2.5-2.503V4.504A2.507 2.507 0 0071.5 2zM56 2.444c-1.826 0-3.511.495-5 1.319V2.444C51 1.1 49.876 0 48.5 0S46 1.099 46 2.444v9.778C46 17.605 50.466 22 56 22c5.506 0 10-4.367 10-9.778-.028-5.41-4.494-9.778-10-9.778zm0 14.64c-2.753 0-5-2.198-5-4.89 0-2.69 2.247-4.888 5-4.888s5 2.197 5 4.889c-.028 2.719-2.247 4.889-5 4.889zM33 2c-5.534 0-10 4.473-10 9.986C23 17.527 27.466 22 33 22c5.506 0 10-4.473 10-10.014C42.972 6.473 38.506 2 33 2zm0 14.993c-2.753 0-5-2.25-5-5.007 0-2.757 2.247-5.007 5-5.007s5 2.25 5 5.007c-.028 2.785-2.247 5.007-5 5.007zM13.736 2A6.175 6.175 0 0010 3.264 6.175 6.175 0 006.264 2 6.228 6.228 0 000 8.236v11.236c0 1.376 1.124 2.5 2.5 2.5s2.5-1.124 2.5-2.5V8.236c0-.702.562-1.264 1.236-1.264.702 0 1.264.562 1.264 1.264v11.236c0 1.376 1.124 2.5 2.5 2.5s2.5-1.124 2.5-2.5V8.208A1.241 1.241 0 0113.736 7C14.438 7 15 7.562 15 8.264V19.5c0 1.376 1.124 2.5 2.5 2.5s2.5-1.124 2.5-2.5V8.236C19.972 4.781 17.191 2 13.736 2z" fill="#333"></path>
            </svg>
          </svg>
        </a>

      </header>
    </div>

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

              <select defaultValue={anoVeiculo} name="anoVeiculo" id="anoVeiculo" className="form-control" data-size="7" data-style="btn btn-simple btn-round" title="Ano Veiculo" disabled={disabledAnoVeiculo}>
                <option value="0" disabled>Ano e combustível</option>
                {listaAnoVeiculo &&
                  listaAnoVeiculo.map((element) => {
                    console.log(listaAnoVeiculo)
                    return <option key={element.codigoAno} value={element.codigoAno}>{element.labelAno}</option>
                  })
                }
              </select>
            </div>
            <div className="consultarPrecos">
              <button className="MuiButtonBase-root MuiButton-root jss290 MuiButton-contained jss291 MuiButton-fullWidth Mui-disabled" type="button" disabled="">
                <span className="MuiButton-label">Consultar preço</span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </div>




          <div className="consulte-tambem">
            <p className="por">Consulte também por:</p>
            <div className="links">
              <a className="link" href="/tabela-fipe/carros">Tabela Fipe Carros </a>
              <p className="espacos">,</p>
              <a className="link" href="/tabela-fipe/motos">Tabela Fipe Motos </a>
              <p className="espacos">&nbsp;e</p>
              <a className="link" href="/tabela-fipe/caminhoes">Tabela Fipe Caminhões </a>
            </div>
          </div>
        </article>
      </section>
    </div>


  </React.Fragment>
}
