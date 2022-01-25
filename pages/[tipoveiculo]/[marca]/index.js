import React from 'react';
import Header from '/src/components/header';
import Helper from '/src/controllers/helper';

export default function AnoCombustivel({ tipoVeiculo, marca }) {
    return <React.Fragment>
        {marca}
    </React.Fragment>
}


export async function getServerSideProps(context) {

    const tipoVeiculo = Helper.IDTipoVeiculo(context.params.tipoveiculo);
    const marca = context.params.marca;

    return {
        props: {
            tipoVeiculo,
            marca
        }
    }
}

