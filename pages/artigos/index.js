import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const sampleposts = [
  {
    id: 1,
    title: 'Decodificando a segurança do cassino online: identificando sinais de alerta e garantindo a segurança do jogador',
    slug: 'Decodificando-a-segurança-do-cassino-online:-identificando-sinais-de-alerta-e-garantindo-a-segurança-do-jogador',
    date: '2024-02-23',
    excerpt: '',
    content : "No mundo em constante expansão dos casinos online, é essencial que os jogadores permaneçam atentos a potenciais sinais de alerta que possam indicar riscos ou instabilidade dentro destas plataformas. Este artigo oferece um guia completo para ajudar os jogadores a navegar no cenário do cassino online e identificar sinais de alerta que podem indicar problemas com uma plataforma específica. Um sinal de alerta significativo é a ausência de licenciamento e regulamentação adequados, uma vez que os casinos online respeitáveis normalmente exibem informações de licenciamento de forma proeminente e aderem a regulamentos rigorosos para garantir a justiça e a protecção do jogador. Por outro lado, a falta de licenciamento ou supervisão regulamentar deverá levantar preocupações imediatas sobre a legitimidade do casino. Outro indicador importante de possíveis problemas está no histórico de reclamações não resolvidas da plataforma ou feedback negativo dos jogadores. Uma pesquisa minuciosa sobre a reputação do casino, incluindo análises e feedback dos jogadores, pode fornecer informações valiosas sobre quaisquer problemas anteriores, como atrasos nos pagamentos ou mau atendimento ao cliente. Além disso, os jogadores devem ter cautela ao se depararem com promessas irrealistas ou bônus excessivamente generosos, pois muitas vezes estes podem vir com termos e condições ocultos que podem prejudicar os jogadores. É crucial ler atentamente e compreender as letras miúdas antes de aceitar qualquer oferta. Além disso, a qualidade e a transparência dos serviços de apoio ao cliente podem servir como um teste à fiabilidade de um casino online. As plataformas legítimas priorizam o suporte ao cliente ágil e útil para responder prontamente às dúvidas e preocupações dos jogadores. Finalmente, é essencial confiar na própria intuição e ter cautela ao lidar com casinos online novos ou não verificados. Se algo parecer errado ou levantar dúvidas sobre a legitimidade de uma plataforma, é melhor proceder com cautela e explorar opções alternativas para se proteger contra riscos potenciais e garantir uma experiência de jogo positiva.",
    img_alt: '/images/artigos/thumbnail1.webp'
    },
  ];

  const BlogPage = ({ posts = sampleposts }) => {
  
  return (
    <>
      <div className="px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1 ">
        <h2 className="flex items-center justify-center mb-6 font-extrabold text-4xl text-black dark:text-white">
            4KBETMINER Blogs
        </h2>

        <h4 className="flex items-center justify-center mb-6 text-lg text-white font-medium">
          4KBETMINER | The Ultimate Betting Games in Casino, Slots, Live Sports and Many More.
        </h4>

      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-10">

      {posts.map(post => {
        return (
          <Link href={`/artigos/${post.slug}`}>
            <div className="rounded-none border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mr-4 mb-4 w-80 h-150 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                <div className="flex flex-col items-center justify-center">
                  <img src={post.img_alt} alt="Image" className="w-full h-48 object-cover mb-2" />
                  <div className="text-center">
                    <div>{post.content.slice(0, 200) + '...'}</div>
                    <p className="mt-2 text-blue-500 cursor-pointer">
                      Saiba Mais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      </div>
       
    </>
  );
}

export default BlogPage;