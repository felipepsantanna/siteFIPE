import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <Head title="Tabela FIPE: Pre??os de carros novos e usados" description="Tabela FIPE atualizada at?? Junho de 2022. Consulte carros, motos e caminh??es por marca, modelo e ano. Veja os valores dos anos anteriores." />
    <Header />

    <div id="section-wrapper" className="sectionWrapper">
      <section className="section-search">


        <article className="article-search">

          <div className="article-search-div1">


          </div>

          <h1 className="h1">Tabela Fipe</h1>
          <h2 className="h2">Consulte o valor de um autom??vel de forma gratuita</h2>



          <div className="box">
            <h2 className="h2">Qual ve??culo voc?? gostaria de comprar ou vender?</h2>
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
                <span className="MuiChip-label">Caminh??o</span>
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
                <option value="0" disabled>Ano e combust??vel</option>
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
                  <span className="MuiButton-label">Consultar pre??o</span>
                  <span className="MuiTouchRipple-root"></span>
                </a>
              </Link>
            </div>
          </div>




          <div className="consulte-tambem">
            <p className="por">Consulte tamb??m por:</p>
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
                <a className="link">Tabela Fipe Caminh??es </a>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>

    <div id="section-wrapper" className="sectionWrapper">
      <section className="section-search">


        <article className="article-search">
          <h2>Tabela Fipe: o que ???</h2>
          <p>?? comum a desinforma????o na internet sobre v??rios assuntos e, sabendo disso, n??s trouxemos neste artigo, informa????es importantes acerca da <strong>Tabela Fipe</strong>, como ela costuma funcionar e qual a sua fun????o em negocia????es.

            Destacamos que a <strong>Tabela Fipe</strong> foi criada pela Funda????o Instituto de Pesquisas Econ??micas - FIPE, por isso sua denomina????o. Al??m disso, esse instituto ?? o principal respons??vel pela refer??ncia no mercado de carros seminovos ou usados, servindo normalmente como base para consulta de valores em negocia????es como seguros ou contratos.
          </p>
          <h3>A origem da Tabela Fipe</h3>
          Criada em 1973 de modo a servir como base de valores para negocia????es de carros, tal tabela foi originada visando ajudar a Faculdade de Economia, Administra????o e Contabilidade da Universidade de S??o Paulo.

          <h3>Mas como funciona a Tabela Fipe?</h3>

          O funcionamento da <strong>Tabela Fipe</strong> ?? bastante simples, mas ?? rigorosa. Ela separa apenas a m??dia dos valores dos ve??culos. Ou seja: s??o considerados os valores m??dios, excluindo os que est??o em extremos: pre??os altos ou baixos demais para o mercado.

          Destaca-se que a <strong>Tabela Fipe</strong> ?? apenas uma esp??cie de ???adere??o???, ou seja, um par??metro para o planejamento estrat??gico de venda de algum ve??culo.

          Assim, a tabela costuma expressar apenas uma m??dia nacional dos valores; organizando e observando aspectos como o estado do ve??culo, sua conserva????o, o ano e modelo. S??o averiguados ve??culos como autom??veis, motos, motonetas, e caminh??es, sejam eles  usados, seminovos ou novos no mercado brasileiro.

          Como um par??metro, a Tabela Fipe ?? bastante usada por pessoas comuns que buscam vender seu ve??culo com um valor justo e coerente com a demanda e a oferta do mercado nacional.

          O ano do carro, moto, caminh??o ou motoneta ?? usado como um dos crit??rios para determinar o valor do ve??culo, al??m dele, usam-se tamb??m o modelo, condi????es do ve??culo, se ?? quatro ou duas portas, motor, etc.

          Os valores s??o sempre divulgados na tabela em reais do m??s e ano de refer??ncia. ?? comum que a tabela sofra altera????es com frequ??ncia e influ??ncia da situa????o econ??mica do pa??s.

          <h3>O valor dos autom??veis aumentou?</h3>
          Segundo informa????es mais recentes, no presente ano (2022), houve um aumento de 21% no valor dos autom??veis. Isso ocorreu devido a uma procura mais intensa e uma oferta de ve??culos no mercado inferior ?? da procura.

          Contudo, apesar de o valor dos autom??veis ter ficado elevado, uma m?? not??cia tamb??m surgiu: o aumento no valor do IPVA tamb??m ocorreu. Desse modo, tanto quem comercializa carros seminovos ou usados, tanto quem apenas utiliza, sentiram impactos s??rios nas finan??as quando o assunto ?? autom??vel.

          Portanto, vale a pena observar frequentemente os valores determinados na tabela, a fim de evitar perdas financeiras ou precificar o ve??culo de maneira equivocada, evitando frustra????es e arrependimentos no p??s-venda.

          Tamb??m para quem compra, ?? imprescind??vel comparar valores e modelos dos carros, motos, caminh??es ou ve??culos afins. A tabela auxilia em grande parte das negocia????es, servindo como um respaldo para argumenta????o no momento da compra do ve??culo.


        </article>
      </section>
    </div>

  </React.Fragment>
}
