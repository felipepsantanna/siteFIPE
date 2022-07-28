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
    <Head title="Tabela FIPE: Preços de carros novos e usados" description="Tabela FIPE atualizada até Junho de 2022. Consulte carros, motos e caminhões por marca, modelo e ano. Veja os valores dos anos anteriores." />
    <Header />

    <div id="section-wrapper" className="sectionWrapper">
      <section className="section-search">


        <article className="article-search">

          <div className="article-search-div1">


          </div>

          <h1 className="h1">Tabela Fipe</h1>
          <h2 className="h2">Consulte o valor de um automóvel de forma gratuita</h2>



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

    <div id="section-wrapper" className="sectionWrapper">
      <section className="section-search">


        <article className="article-search">
          <h2>Tabela Fipe: o que é?</h2>
          <p>É comum a desinformação na internet sobre vários assuntos e, sabendo disso, nós trouxemos neste artigo, informações importantes acerca da <strong>Tabela Fipe</strong>, como ela costuma funcionar e qual a sua função em negociações.

            Destacamos que a <strong>Tabela Fipe</strong> foi criada pela Fundação Instituto de Pesquisas Econômicas - FIPE, por isso sua denominação. Além disso, esse instituto é o principal responsável pela referência no mercado de carros seminovos ou usados, servindo normalmente como base para consulta de valores em negociações como seguros ou contratos.
          </p>
          <h3>A origem da Tabela Fipe</h3>
          Criada em 1973 de modo a servir como base de valores para negociações de carros, tal tabela foi originada visando ajudar a Faculdade de Economia, Administração e Contabilidade da Universidade de São Paulo.

          <h3>Mas como funciona a Tabela Fipe?</h3>

          O funcionamento da <strong>Tabela Fipe</strong> é bastante simples, mas é rigorosa. Ela separa apenas a média dos valores dos veículos. Ou seja: são considerados os valores médios, excluindo os que estão em extremos: preços altos ou baixos demais para o mercado.

          Destaca-se que a <strong>Tabela Fipe</strong> é apenas uma espécie de “adereço”, ou seja, um parâmetro para o planejamento estratégico de venda de algum veículo.

          Assim, a tabela costuma expressar apenas uma média nacional dos valores; organizando e observando aspectos como o estado do veículo, sua conservação, o ano e modelo. São averiguados veículos como automóveis, motos, motonetas, e caminhões, sejam eles  usados, seminovos ou novos no mercado brasileiro.

          Como um parâmetro, a Tabela Fipe é bastante usada por pessoas comuns que buscam vender seu veículo com um valor justo e coerente com a demanda e a oferta do mercado nacional.

          O ano do carro, moto, caminhão ou motoneta é usado como um dos critérios para determinar o valor do veículo, além dele, usam-se também o modelo, condições do veículo, se é quatro ou duas portas, motor, etc.

          Os valores são sempre divulgados na tabela em reais do mês e ano de referência. É comum que a tabela sofra alterações com frequência e influência da situação econômica do país.

          <h3>O valor dos automóveis aumentou?</h3>
          Segundo informações mais recentes, no presente ano (2022), houve um aumento de 21% no valor dos automóveis. Isso ocorreu devido a uma procura mais intensa e uma oferta de veículos no mercado inferior à da procura.

          Contudo, apesar de o valor dos automóveis ter ficado elevado, uma má notícia também surgiu: o aumento no valor do IPVA também ocorreu. Desse modo, tanto quem comercializa carros seminovos ou usados, tanto quem apenas utiliza, sentiram impactos sérios nas finanças quando o assunto é automóvel.

          Portanto, vale a pena observar frequentemente os valores determinados na tabela, a fim de evitar perdas financeiras ou precificar o veículo de maneira equivocada, evitando frustrações e arrependimentos no pós-venda.

          Também para quem compra, é imprescindível comparar valores e modelos dos carros, motos, caminhões ou veículos afins. A tabela auxilia em grande parte das negociações, servindo como um respaldo para argumentação no momento da compra do veículo.


        </article>
      </section>
    </div>

  </React.Fragment>
}
