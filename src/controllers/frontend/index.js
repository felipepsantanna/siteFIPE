import dbmarcas from '/src/db/marcas.json';

export default class Index {

    mesReferencia = {
        "Codigo": 292,
        "Mes": "Dezembro/2022 "
    };
    url = 'https://api.rocktools.com.br/Fipe/';
    //url = " https://localhost:44328/Fipe/";
    marcas = null;
    modelos = null;
    Fipe = null;
    related = null;

    async getMarcasID(labelTipoVeiculo, marca) {

        const found = dbmarcas.find(element => element.tipo.toUpperCase() == labelTipoVeiculo.toUpperCase() && (element.Label.toUpperCase() == marca.replace('-', ' ').toUpperCase() || element.Url.toUpperCase() == marca.toUpperCase()));

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
        console.log(urlAPI);
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

    async getRelated(codigoMesReferencia, tipoVeiculo, codigoMarca, codigoModelo, codigoAno) {

        var urlAPI = new URL(`${this.url}Related?codigoMesReferencia=${codigoMesReferencia}&tipoVeiculo=${tipoVeiculo}&codigoMarca=${codigoMarca}&codigoModelo=${codigoModelo}&codigoAno=${codigoAno}`);

        const _Fipe = await fetch(urlAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.related = json;
            })
            .catch((error) => {
                console.log('error: ' + error);
                return error;
            });
    }
}