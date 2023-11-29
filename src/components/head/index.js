import React from 'react';
import NextHead from 'next/head';


export default function Head({ title, description, url, scheme }) {
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
                <script
                type="application/ld+json"
                key="product-jsonld">
                    {scheme}
                </script>
                <meta name="description" content={description} />
            </NextHead>
        </React.Fragment>
    );
}

