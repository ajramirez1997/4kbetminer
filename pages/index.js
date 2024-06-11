import React from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDatabase, faUsers, faGift } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h2 className="flex items-center justify-center mb-6 font-bold text-4xl text-black dark:text-white">
            Bem-vindo, Jogador!
        </h2>

        <p className="mb-6">
          Nossa plataforma de resultados 4KBET aumenta a lucratividade do mercado de apostas online. Ele fornece acesso a uma vasta gama de resultados de cassinos conhecidos como 4KBET,{<a className="text-yellow" href="https://www.sssgame.com?code=4160938" target="_blank"> SSSGame</a>}, {<a className="text-yellow" href="https://pptiger.com/?id=10306764" target="_blank"> PPTiger</a>}, {<a className="text-yellow" target="_blank" href="https://tgjogo.com/?code=1360346"> TGjogo</a>} e outros, permitindo que os usuários aproveitem esses dados de forma eficaz. Utilize filtros, validadores, simuladores e outras ferramentas sofisticadas para analisar e refinar as suas estratégias de apostas, otimizando assim o seu potencial de sucesso.  
        </p>

        <h2 className="flex items-center justify-center mb-6 font-bold text-4xl text-black dark:text-white">
            Em relação à história do 4KBET:
        </h2>

        <p className="mb-6">
          4KBET History foi desenvolvido para simplificar a observação de tendências nos jogos Crash e Double de 4KBET. Oferece detalhes valiosos relacionados ao jogo, incluindo o tempo e o número de rodadas desde a última reinicialização, entre outros, todos fornecidos gratuitamente.
        </p>

      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-10">

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mr-4 mb-4 w-80 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FontAwesomeIcon icon={faEye} />
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-title-md font-bold text-black dark:text-white">+ de 1 milhão</h4>
              <span className="text-sm font-medium">visualizações</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mr-4 mb-4 w-80 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FontAwesomeIcon icon={faDatabase} />
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-title-md font-bold text-black dark:text-white">+ de 690000 mil</h4>
              <span className="text-sm font-medium">resultados gravados</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mr-4 mb-4 w-80 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FontAwesomeIcon icon={faUsers} />
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-title-md font-bold text-black dark:text-white">+ de 19000 mil</h4>
              <span className="text-sm font-medium">cadastros ativos</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mr-4 mb-4 w-80 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FontAwesomeIcon icon={faGift} />
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-title-md font-bold text-black dark:text-white">1</h4>
              <span className="text-sm font-medium">cassino registrado</span>
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-sm border border-stroke bg-white px-10 py-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-12 xl:pb-6">

        <h2 className="flex items-center justify-center mb-6 font-bold text-4xl text-black dark:text-white">
          Sites Afiliados de Cassino
        </h2>

    <div className="flex flex-wrap justify-center">

      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 sm:w-96 md:w-104 lg:w-112 xl:w-96 flex flex-col justify-center items-center">

        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">SSSGame</h2>
        <div className="border-b border-gray-300 dark:border-gray-700"></div>
        <div className="flex justify-center mt-4">
          <Link href="https://www.sssgame.com?code=4160938" target="_blank">
            <button className="rounded-full py-2 px-4 bg-blue-500 text-white mr-2 w-32 sm:w-40 text-center">SSSGame Site</button>
          </Link>
        </div>
        <Image src="/images/platform/block_sssgame.webp" alt="SSS Game" width={300} height={200} className="mt-4" />
      </div>

      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 sm:w-96 md:w-104 lg:w-112 xl:w-96 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">TGJogo</h2>
        <div className="border-b border-gray-300 dark:border-gray-700"></div>
        <div className="flex justify-center mt-4">
          <Link href="https://tgjogo.com?code=1360346" target="_blank">
            <button className="rounded-full py-2 px-4 bg-blue-500 text-white mr-2 w-32 sm:w-40 text-center">TGJogo Site</button>
          </Link>
        </div>
        <Image src="/images/platform/block_tgjogo.webp" alt="TGJOGO" width={300} height={200} className="mt-4" />
      </div>

      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 sm:w-96 md:w-104 lg:w-112 xl:w-96 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">PPTiger</h2>
        <div className="border-b border-gray-300 dark:border-gray-700"></div>
        <div className="flex justify-center mt-4">
          <Link href="https://pptiger.com/?id=10306764" target="_blank">
            <button className="rounded-full py-2 px-4 bg-blue-500 text-white mr-2 w-32 sm:w-40 text-center">PPTiger Site</button>
          </Link>
        </div>
        <Image src="/images/platform/block_pptiger.webp" alt="PPTIGER" width={300} height={200} className="mt-4" />
      </div>
      
    </div>

</div>
    </>
  )
}
