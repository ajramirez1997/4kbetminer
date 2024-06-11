import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


  return (
    <Html lang="pt">
      <Head>
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourname" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} /> */}
       
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
