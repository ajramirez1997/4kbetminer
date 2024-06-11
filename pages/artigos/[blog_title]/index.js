// pages/articles/[slug].js
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ArticlePage = ({ post }) => {
  const router = useRouter();
  const { blog_title } = router.query;

  return (
   
        <div className="px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1 ">
            
        <div className="container mx-auto flex justify-center items-center mb-10 mt-5 px-4 sm:px-0" style={{ maxWidth: '850px'}}>
            <img src={post?.img_alt} alt="Image" className="object-cover" />
        </div>

        <h1 className="flex items-center justify-center mb-6 font-extrabold text-4xl text-black dark:text-white">
            {post?.title}
        </h1>
        
        <div className="text-white mb-6 px-50">
            {post?.content}
        </div>

    </div>
  );
};

export async function getStaticPaths() {
  const posts = [
    { blog_title: 'Decodificando-a-segurança-do-cassino-online:-identificando-sinais-de-alerta-e-garantindo-a-segurança-do-jogador' },
  ];

  const paths = posts.map((post) => ({
    params: { blog_title: post.blog_title },
  }));

  return {
    paths,
    fallback: true, 
  };
}

export async function getStaticProps({ params }) {

  const postsData = {
    'Decodificando-a-segurança-do-cassino-online:-identificando-sinais-de-alerta-e-garantindo-a-segurança-do-jogador': {
      title: 'Decodificando a segurança do cassino online: identificando sinais de alerta e garantindo a segurança do jogador',
      date: '2024-02-23',
      img_alt: '/images/artigos/thumbnail1.webp',
      excerpt: '',
      content : "No mundo em constante expansão dos casinos online, é essencial que os jogadores permaneçam atentos a potenciais sinais de alerta que possam indicar riscos ou instabilidade dentro destas plataformas. Este artigo oferece um guia completo para ajudar os jogadores a navegar no cenário do cassino online e identificar sinais de alerta que podem indicar problemas com uma plataforma específica. Um sinal de alerta significativo é a ausência de licenciamento e regulamentação adequados, uma vez que os casinos online respeitáveis normalmente exibem informações de licenciamento de forma proeminente e aderem a regulamentos rigorosos para garantir a justiça e a protecção do jogador. Por outro lado, a falta de licenciamento ou supervisão regulamentar deverá levantar preocupações imediatas sobre a legitimidade do casino. Outro indicador importante de possíveis problemas está no histórico de reclamações não resolvidas da plataforma ou feedback negativo dos jogadores. Uma pesquisa minuciosa sobre a reputação do casino, incluindo análises e feedback dos jogadores, pode fornecer informações valiosas sobre quaisquer problemas anteriores, como atrasos nos pagamentos ou mau atendimento ao cliente. Além disso, os jogadores devem ter cautela ao se depararem com promessas irrealistas ou bônus excessivamente generosos, pois muitas vezes estes podem vir com termos e condições ocultos que podem prejudicar os jogadores. É crucial ler atentamente e compreender as letras miúdas antes de aceitar qualquer oferta. Além disso, a qualidade e a transparência dos serviços de apoio ao cliente podem servir como um teste à fiabilidade de um casino online. As plataformas legítimas priorizam o suporte ao cliente ágil e útil para responder prontamente às dúvidas e preocupações dos jogadores. Finalmente, é essencial confiar na própria intuição e ter cautela ao lidar com casinos online novos ou não verificados. Se algo parecer errado ou levantar dúvidas sobre a legitimidade de uma plataforma, é melhor proceder com cautela e explorar opções alternativas para se proteger contra riscos potenciais e garantir uma experiência de jogo positiva.",
    },
  };
    
  const post = postsData[params.blog_title];

  return {
    props: {
      post,
    },
  };
}

export default ArticlePage;