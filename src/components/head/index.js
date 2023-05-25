import React from 'react';
import NextHead from 'next/head';


export default function Head({ title, description }) {
    return (
        <React.Fragment>
            <NextHead>
                <title>
                    {title}
                </title>
                <meta name="description" content={description} />
            </NextHead>
        </React.Fragment>
    );
}

