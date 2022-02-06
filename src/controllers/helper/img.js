const Img = {
    Exist: [1, 3, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 43, 44, 45, 46, 47, 48,
        50, 51, 52, 54, 55, 56, 57, 58, 59, 125, 127, 136, 140, 147, 152, 153, 156, 157,
        161, 165, 167, 168, 170, 171, 177, 183, 186, 189, 195, 199, 208],
    LogoDasMarcas(id, labelTipoVeiculo) {
        let src = "/" + labelTipoVeiculo + ".png";
        if (this.Exist.includes(parseInt(id))) {
            src = "/marcas/" + id + ".png";
        }
        return src;
    }
}

export default Img;