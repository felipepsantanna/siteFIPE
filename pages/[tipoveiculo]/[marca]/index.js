import React from 'react';


export default function AnoCombustivel({ tipoVeiculo, marca }) {
    return <React.Fragment>
        {marca}
    </React.Fragment>
}


export async function getServerSideProps(context) {
    console.log(context.params);


    const dePara = {
        carros: 1,
        motos: 2,
        caminhoes: 3
    }
    const tipoVeiculo = dePara[context.params.tipoveiculo];
    const marca = context.params.marca;

    return {
        props: {
            tipoVeiculo,
            marca
        }
    }
}

