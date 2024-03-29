
const Helper = {
    LabelTipoVeiculo(idTipoVeiculo) {
        const labels = ["", "Carros", "Motos", "Caminhões"]
        return labels[idTipoVeiculo];
    },

    LabelSingularTipoVeiculo(idTipoVeiculo) {
        const labels = ["", "carro", "moto", "caminhão"]
        return labels[idTipoVeiculo];
    },
    UmUmaLabelTipoVeiculo(idTipoVeiculo) {
        const labels = ["", "um", "uma", "um"]
        return labels[idTipoVeiculo];
    },

    OALabelTipoVeiculo(idTipoVeiculo) {
        const labels = ["", "o", "a", "o"]
        return labels[idTipoVeiculo];
    },

    LabelTipoVeiculoURL(idTipoVeiculo) {
        const labels = ["", "carros", "motos", "caminhoes"]
        return labels[idTipoVeiculo];
    },

    IDTipoVeiculo(labelTipoVeiculo) {
        const tipoVeiculo = {
            carros: 1,
            motos: 2,
            caminhoes: 3
        }
        return tipoVeiculo[labelTipoVeiculo];
    },

    async createURL(tipoVeiculo, labelMarca, labelModelo, labelAno) {
        switch (parseInt(tipoVeiculo)) {
            case 1:
                tipoVeiculo = "carros";
                break;
            case 2:
                tipoVeiculo = "motos";
                break;
            case 3:
                tipoVeiculo = "caminhoes";
                break;
            default:
                break;
        }

        return ("/" + tipoVeiculo + "/" + this.NormalizeURL(labelMarca) + "/" + this.NormalizeURL(labelModelo) + "/" + this.NormalizeURL(labelAno)).toLowerCase();
    },

    NormalizeURL(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
            .replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
            .replace(/(^-+|-+$)/, ''); // Remove hífens extras do final ou do inicio da string
    },

    CapitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = Helper;