import marcas from '/src/db/marcas.json';

export default class Index {

    mesReferencia = {
        "Codigo": 281,
        "Mes": "Janeiro/2022 "
    };
    url = 'https://api.rocktools.com.br/Fipe/';
    //url = " https://localhost:44328/Fipe/";
    marcas = null;
    modelos = null;
    Fipe = null;

async getMarcasID(labelTipoVeiculo, marca){
    console.log(labelTipoVeiculo)
    console.log(marca)
    const found = marcas.find(element => element.tipo.toUpperCase() == labelTipoVeiculo.toUpperCase() && element.Label.toUpperCase() == marca.toUpperCase());
    console.log(found)
    return found;
}
    async getMesReferencia() {
        var urlAPI = new URL(`${this.url}MesReferencia`);
        const _mesReferencia = await fetch(urlAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.mesReferencia = json[0];
            })
            .catch((error) => {
                console.log('error: ' + error);
                return error;
            });
    }

    async getMarcas(codigoMesReferencia, codigoTipoVeiculo) {
        var urlAPI = new URL(`${this.url}Marcas?mesReferencia=${codigoMesReferencia}&tipoVeiculo=${codigoTipoVeiculo}`);
        const _marcas = await fetch(urlAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.marcas = json;
            })
            .catch((error) => {
                console.log('error: ' + error);
                return error;
            });
    }

    async getModelos(codigoMesReferencia, codigoTipoVeiculo, codigoMarca) {
        var urlAPI = new URL(`${this.url}Modelos?mesReferencia=${codigoMesReferencia}&tipoVeiculo=${codigoTipoVeiculo}&codigoMarca=${codigoMarca}`);
        const _modelos = await fetch(urlAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.modelos = json;
            })
            .catch((error) => {
                console.log('error: ' + error);
                return error;
            });
    }

    async getUrlFipe(url) {
        var urlAPI = new URL(`${this.url}BuscaURL?url=${url}`);
        const _Fipe = await fetch(urlAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.Fipe = json;
            })
            .catch((error) => {
                console.log('error: ' + error);
                return error;
            });
    }
}