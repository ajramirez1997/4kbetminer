import Head from 'next/head'
import "../styles/satoshi.css";
import "../styles/style.css";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Nextra({ Component, pageProps }) {

  const router = useRouter();
  const c_path = router.pathname;
  const { blog_title } = router.query;
  const meta = {
    title: '',
    description: '',
    keywords: '',
    canonical: '',
  }
  const setTitle = (path) => {
    
    switch(path) { 
      case '/': 
        meta.title = '4KBET - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.description = '4KBET - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.keywords = 'sssgame,historico blaze,crash,double,aviator,PG Slot',
        meta.canonical = 'https://www.4kbetminer.com/'
        break
    
      case '/4kbet/double':
        meta.title = '4KBET Double - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.description = '4KBET Double - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.keywords = 'sssgame,historico blaze,crash,double,aviator,PG Slot',
        meta.canonical = 'https://www.4kbetminer.com/4kbet/double'
        break
      case '/4kbet/crash':
        meta.title = '4KBET Crash - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.description = '4KBET Crash - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
        meta.keywords = 'sssgame,historico blaze,crash,double,aviator,PG Slot',
        meta.canonical = 'https://www.4kbetminer.com/4kbet/crash'
        break
        case '/artigos':
          meta.title = '4KBET Artigos - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
          meta.description = '4KBET Artigos - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
          meta.keywords = 'sssgame,historico blaze,crash,double,aviator,PG Slot',
          meta.canonical = 'https://www.4kbetminer.com/artigos'
          break
          case '/artigos/[blog_title]':
            meta.title = '4KBET Artigos - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
            meta.description = '4KBET Artigos - Resultados e Dicas para Históricos 4kbet Crash, aviator PG Slot, Double | 4kbetminer.com',
            meta.keywords = 'sssgame,historico blaze,crash,double,aviator,PG Slot',
            meta.canonical = `https://www.4kbetminer.com/artigos/${blog_title}`
            break
      
      default: 
      break;
    }
    return meta;
  }

  const title = setTitle(c_path);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <>
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={title.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <meta property="og:site_name" content={title.title} />
        <meta property="og:description" content={title.description} />
        <meta property="og:title" content={title.title} />
        <meta property="og:image" content={title.image} />
        <meta name="author" content="estrelabeminer"/>
        <link rel="canonical" href={title.canonical}/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="icon" href="/favicon.ico"/>
        <title>{title.title}</title>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml"/>
      </Head>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="p-4">
            { <Component {...pageProps} /> }</div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
