import React from 'react';
import NextHead from 'next/head';


export default function Head({ title, description, url }) {
    return (
        <React.Fragment>
            <NextHead>
                <title>
                    {title}
                </title>
                <link
                    rel="canonical"
                    href={url}
                    key="canonical"
                />
                <meta name="description" content={description} />
            </NextHead>
        </React.Fragment>
    );
}

