import React from 'react';
import Link from 'next/link';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>{statusCode ? `Erro ${statusCode}` : 'Erro na página'}</h1>
      <p>
        {statusCode
          ? 'Ocorreu um erro no servidor.'
          : 'Ocorreu um erro na renderização da página.'}
      </p>
      <Link href="/">Voltar para a página inicial</Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;