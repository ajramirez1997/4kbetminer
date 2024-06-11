import React, { useEffect, useState, useRef } from 'react';
import Axios from "axios";
import Image from 'next/image';


const Crash = () => {
  
  const [counts, setCounts] = useState({ total: 0, red: 0, black: 0 });
  const [BlackConsecutives, setBlackConsecutives] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [RedConsecutives, setRedConsecutives] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [FirstRange, setFirstRange] = useState([]);
  const [SecondRange, setSecondRange] = useState([]);
  const ranges = [
    { key: '2-3', min: 2, max: 3 },
    { key: '3-5', min: 3, max: 5 },
    { key: '5-10', min: 5, max: 10 },
    { key: '10-20', min: 10, max: 20 },
    { key: '20-30', min: 20, max: 30 },
    { key: '30-40', min: 30, max: 40 },
    { key: '40-50', min: 40, max: 50 },
    { key: '50-60', min: 50, max: 60 },
    { key: '60-70', min: 60, max: 70 },
    { key: '70-80', min: 70, max: 80 },
    { key: '80-90', min: 80, max: 90 },
    { key: '90-100', min: 90, max: 100 },
    { key: '100', min: 100, max: Infinity }
  ];
  const [ResultRange, setResultRange] = useState(Object.fromEntries(ranges.map(range => [range.key, 0])));
  const [latestGameTime, setLatestGameTime] = useState(0);
  const [latestHash, setLatestHash] = useState("");
  const initialized = useRef(false);

  useEffect(() => {

    let intervalResult; 
    var BlackCountConsecutives = 0;
    var RedCountConsecutives = 0;
    let consecutive1Below = [];
    let consecutive2Above = [];

    const loadPreviousContent = () => {

      const newCounts = { total: 0, red: 0, black: 0 };
      consecutive1Below = [];
      consecutive2Above = [];

      Axios.post("https://tipcrash.live:8443/api/sssgame/crash", {})
        .then((response) => {

          setLatestGameTime(response.data.results[0].game_time);
          setLatestHash(response.data.results[0].hash);

          response.data.results.forEach((result) => {

            if (consecutive1Below.length > 8) {
              
              FirstRange.push([...consecutive1Below]);
              consecutive1Below = [];
            }
            if (consecutive2Above.length > 8) {
              
              SecondRange.push([...consecutive2Above]);
              consecutive2Above = [];
            }

            ranges.forEach(range => {
              if (result.result >= range.min && result.result <= range.max) {
                setResultRange(prevRange => ({
                  ...prevRange,
                  [range.key]: prevRange[range.key] + 1
                }));
              }
            });

            if (result.result < 2) {
            
              BlackCountConsecutives++;
              newCounts.black++;
              consecutive1Below.push(result.result);
              
              if (RedCountConsecutives >= 1 && RedCountConsecutives <= 4) {
                
                RedConsecutives[RedCountConsecutives]++;
                RedCountConsecutives = 0;

              }else if(RedCountConsecutives >= 5){

                RedConsecutives[5]++;
                RedCountConsecutives = 0;

              }
              if (consecutive2Above.length >= 5) {
                SecondRange.push([...consecutive2Above]);
              }
              consecutive2Above = [];

            }else{

              RedCountConsecutives++;
              newCounts.red++;
              consecutive2Above.push(result.result);

              if (BlackCountConsecutives >= 1 && BlackCountConsecutives <= 4) {
                
                BlackConsecutives[BlackCountConsecutives]++;
                BlackCountConsecutives = 0;

              }else if(BlackCountConsecutives >= 5){

                BlackConsecutives[5]++;
                BlackCountConsecutives = 0;

              }
              if (consecutive1Below.length >= 5) {
                FirstRange.push([...consecutive1Below]);
              }

              consecutive1Below = [];
            }

            newCounts.total++;
            generateContent(result.result, result.game_time, 0);

          });
          
          setCounts(newCounts);
          
          intervalResult = setInterval(() => {
            getNewResults(latestGameTime, latestHash);
          }, 5000);
        });

    };

    const generateContent = (num, game_time, status) => {
      
        const resultsList = document.getElementById('results-crash');
        
        let bg_color;
        
        if (num < 2) {
          bg_color = "black";
        }else{
          bg_color = "red";
        }

        const resultItem = document.createElement('li');
        resultItem.classList.add('result');

        // const headerDiv = document.createElement('div');
        // headerDiv.className = 'header';
        // headerDiv.textContent = counting.toString();
        
        if (status) resultItem.classList.add('added');

        const headDiv = document.createElement('div');
        headDiv.className = 'head ' + bg_color;
        
        const span = document.createElement('span');
        span.textContent = num.toString();
        headDiv.appendChild(span);

        let date = new Date(parseInt(game_time) * 1000);
        let options = { timeZone: 'America/Sao_Paulo',  hour12: false };
        let brazilTime = date.toLocaleString('pt', options);
        let [hours, minutes] = brazilTime.split(' ')[1].split(':');
        let formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

        const footDiv = document.createElement('div');
        footDiv.className = 'foot';
        footDiv.textContent = formattedTime;

        // resultItem.appendChild(headerDiv);
        resultItem.appendChild(headDiv);
        resultItem.appendChild(footDiv);

        if (resultsList) {

          if (status) resultsList.prepend(resultItem);
          else resultsList.appendChild(resultItem);

        }else{
          
          console.error("Element with id 'results' not found.");

        }
        
        setInterval(() => {
            document.querySelector('.added')?.classList.remove('added');
        }, 1000);

    }

    const getNewResults = (latestGameTime, latestHash) => {
      clearInterval(intervalResult);
        Axios.post("https://tipcrash.live:8443/api/sssgame/crash", {}).then((response) => {

          const latestData = response.data.results[0].result;
          const latestDataTime = response.data.results[0].game_time;
          const latestDataHash = response.data.results[0].hash;

          setLatestGameTime(latestDataTime);
          setLatestHash(latestDataHash);

          if (latestGameTime != latestDataTime && latestGameTime != 0 && latestHash != latestDataHash && latestHash != "") {
            
            generateContent(latestData, latestDataTime, 1);
            
            setCounts(prevCounts => {

              const newCounts = { ...prevCounts };

                if (latestData < 2) {

                    BlackCountConsecutives++;
                    newCounts.black++;

                    if (RedCountConsecutives >= 1 && RedCountConsecutives <= 4) {
                  
                      RedConsecutives[RedCountConsecutives]++;
                      RedCountConsecutives = 0;
      
                    }else if(RedCountConsecutives >= 5){
      
                      RedConsecutives[5]++;
                      RedCountConsecutives = 0;
      
                    }
                    if (consecutive2Above.length >= 5) {
                      SecondRange.push([...consecutive2Above]);
                    }
                    consecutive2Above = [];

                } else {

                  RedCountConsecutives++;
                  newCounts.red++;

                  if (BlackCountConsecutives >= 1 && BlackCountConsecutives <= 4) {
                
                    BlackConsecutives[BlackCountConsecutives]++;
                    BlackCountConsecutives = 0;
    
                  }else if(BlackCountConsecutives >= 5){
    
                    BlackConsecutives[5]++;
                    BlackCountConsecutives = 0;
    
                  }
                  if (consecutive1Below.length >= 5) {
                    FirstRange.push([...consecutive1Below]);
                  }
    
                  consecutive1Below = [];

                }

                newCounts.total++;

                return newCounts;

            });

          }

          intervalResult = setInterval(() => {
              getNewResults(latestDataTime, latestDataHash);
          }, 2000);

        });
    }

    if (!initialized.current) {
        initialized.current = true

        loadPreviousContent();
    }
  }, [latestGameTime, latestHash]);


  return (
    <>

<div className="custom-scrollbar-wrapper whitespace-nowrap gap-2 mt-10 mb-10">

  <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
    <div className="custom-y-scrollbar-wrapper w-full flex flex-col items-center">
    
    <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-4">Proporção de Cores ( {counts.total} Rounds ) </h2>

    <div className="flex justify-center mt-8 mb-8">
      
      <div className="container flex flex-col justify-center items-center">
        <div className="content">
          <a href="https://www.sssgame.com?code=4160938" target="_blank"><Image src="/images/platform/block_sssgame.webp" alt="SSSGAME logo" width={250} height={150} className="mt-4" /></a>
        </div>
      </div>

    </div>

    <div className="absolute bottom-0 mb-3 w-full flex justify-between border-footer">
      <a href='https://www.sssgame.com?code=4160938' target="_blank" className="bg-transparent mr-2 ml-5 w-full sm:w-28 text-center rounded-md" style={{ border: '1px solid #fbff0d', color: '#fbff0d' }}>sssgame.com</a>
      <a href='https://www.sssgame.com?code=4160938' target="_blank" className="bg-transparent ml-2 mr-5 w-full sm:w-24 text-center rounded-md" style={{ border: '1px solid #fbff0d', color: '#fbff0d' }}>Crash</a>
    </div>

    </div>
  </div>

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-10 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper w-full flex flex-col items-center">
        
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-4">Proporção de Cores ( {counts.total} Rounds ) </h2>

        <div className="flex justify-center mt-8 mb-8">
          
          <div className="container flex flex-col justify-center items-center mr-5">
            <div className="header w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mb-3">{counts.black}</div>
            <div className="content">
                <div className="box-crash-red flex justify-center items-center">
                  <span className="box-span">x2 +</span>
                </div>
            </div>
            <div className="footer w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> { counts.total !== 0 ? ((counts.black / counts.total ) * 100).toFixed(2) : 0 }% </div>
          </div>

          <div className="container flex flex-col justify-center items-center ml-5">
            <div className="header w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mb-3">{counts.black}</div>
            <div className="content">
              <div className="box-crash-black flex justify-center items-center">  
                <span className="box-span mr-5">-1.99X</span>
              </div>
            </div>
            <div className="footer w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> { counts.total !== 0 ? ((counts.black / counts.total ) * 100).toFixed(2) : 0 }% </div>
          </div>

        </div>
        <div className="absolute bottom-0 mb-3 flex justify-center border-footer">
          <p><span className="font-bold">Quantidade</span> e <span className="font-bold">Porcentagem</span> das cores na tela</p>
        </div>

        </div>
      </div>

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-10 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper flex flex-col items-center mx-4">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-3 border-header">Máximo de Sequências Pretas ( {counts.total} Rounds )</h2>


              <div className="flex flex-col justify-center items-center mt-3 flex-wrap">
                <p className='mb-3 text-red-blaze'>
                  <span className='font-bold'>{RedConsecutives[1]}</span> sequências de <span className='font-bold'>1</span> casa da cor<span className='font-bold'>vermelha</span>
                </p>
                <p className='mb-3 text-red-blaze'>
                  <span className='font-bold'>{RedConsecutives[2]}</span> sequências de <span className='font-bold'>2</span> casas da cor <span className='font-bold'>vermelha</span>
                </p>
                <p className='mb-3 text-red-blaze'>
                  <span className='font-bold'>{RedConsecutives[3]}</span> sequências de <span className='font-bold'>3</span> casas da cor <span className='font-bold'>vermelha</span>
                </p>
                <p className='mb-3 text-red-blaze'>
                  <span className='font-bold'>{RedConsecutives[4]}</span> sequências de <span className='font-bold'>4</span> casas da cor <span className='font-bold'>vermelha</span>
                </p>
                <p className='mb-3 text-red-blaze'>
                  <span className='font-bold'>{RedConsecutives[5]}</span> sequências de <span className='font-bold'>5</span> casas da cor <span className='font-bold'>vermelha</span>
                </p>
                <p className='mb-3'>
                  <span className='font-bold'>{BlackConsecutives[1]}</span> sequências de <span className='font-bold'>1</span> casa da cor <span className='font-bold'>preta</span>
                </p>
                <p className='mb-3'>
                  <span className='font-bold'>{BlackConsecutives[2]}</span> sequências de <span className='font-bold'>2</span> casas da cor <span className='font-bold'>preta</span>
                </p>
                <p className='mb-3'>
                  <span className='font-bold'>{BlackConsecutives[3]}</span> sequências de <span className='font-bold'>3</span> casas da cor <span className='font-bold'>preta</span>
                </p>
                <p className='mb-3'>
                  <span className='font-bold'>{BlackConsecutives[4]}</span> sequências de <span className='font-bold'>4</span> casas da cor <span className='font-bold'>preta</span>
                </p>
                <p className='mb-3'>
                  <span className='font-bold'>{BlackConsecutives[5]}</span> sequências de <span className='font-bold'>5</span> casas da cor <span className='font-bold'>preta</span>
                </p>
              </div>

          <div className="absolute bottom-0 mb-3 flex justify-center border-footer">
            <p>Últimas <span className="font-bold">sequências máximas</span> de <span className="font-bold">pedras pretas</span> a partir dos resultados na tela</p>
          </div>
          
        </div>
      </div>

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-10 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper flex flex-col items-center mx-4">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-3 border-header">Máximo de Sequências Pretas ( {counts.total} Rounds )</h2>


          <div className="flex justify-center mt-3 flex-wrap">

            <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-single-digit'>2X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['2-3']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-single-digit'>3X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['3-5']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-single-digit'>5X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['5-10']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>10X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['10-20']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>20X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['20-30']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>30X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['30-40']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>40X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['40-50']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>50X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['50-60']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>60X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['60-70']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>70X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['70-80']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>80X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['80-90']} vezes</div>
              </div>
              
              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-double-digit'>90X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['90-100']} vezes</div>
              </div>

              <div className="container flex flex-col justify-center items-center mb-2 mr-10 w-15">
                <div className="content">
                  <div className="smaller-box-crash-red flex justify-center items-center">
                    <span className='span-crash-triple-digit'>100X</span>
                  </div>
                </div>
                <div className="footer w-18 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {ResultRange['100']} vezes</div>
              </div>

            </div>

          <div className="absolute bottom-0 mb-3 flex justify-center border-footer">
            <p><span className="font-bold">Frequência</span> de aparecimento de cada <span className="font-bold">Pico </span> com base nos resultados na tela</p>
          </div>
          
        </div>
      </div>


      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-10 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper flex flex-col items-center mx-9">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-3 border-header">Máximo de Sequências Pretas ( {counts.total} Rounds )</h2>


            {FirstRange.map((range, index) => (
              <>
              <div key={index} className="flex justify-center mt-3 flex-wrap">
                <div className="container flex flex-col justify-center items-center mb-2 w-15">
                  <div className="content">
                    <p className='mb-3'>
                      <span className='font-bold text-red-blaze'>{range.length}</span> casas <span className='font-bold text-red-blaze'>pretas</span> seguidas
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-7">
                  {range.map((value, i) => (
                    
                    <div key={i} className="container flex flex-col justify-center items-center mb-2 w-15">
                      <div className="content">
                        <div className="smaller-box-crash-black flex justify-center items-center">
                          <span className='span-crash-single-digit'>{value}</span>
                        </div>
                      </div>
                    </div>
              
                  ))}
                </div>
                </>
            ))}

          <div className="absolute bottom-0 mb-3 flex justify-center border-footer">
            <p>Últimas <span className="font-bold">sequências máximas</span> de <span className="font-bold">pedras pretas</span> a partir dos resultados na tela</p>
          </div>
          
        </div>
      </div>

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-10 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper flex flex-col items-center mx-9">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-3 border-header">Máximo de Sequências Pretas ( {counts.total} Rounds )</h2>


            {SecondRange.map((range, index) => (
              <>
              <div key={index} className="flex justify-center mt-3 flex-wrap">
                <div className="container flex flex-col justify-center items-center mb-2 w-15">
                  <div className="content">
                    <p className='mb-3'>
                      <span className='font-bold text-red-blaze'>{range.length}</span> casas <span className='font-bold text-red-blaze'>pretas</span> seguidas
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-7">
                  {range.map((value, i) => (
                    
                    <div key={i} className="container flex flex-col justify-center items-center mb-2 w-15">
                      <div className="content">
                        <div className="smaller-box-crash-red flex justify-center items-center mr-3">
                          <span className={value < 10 ? "span-crash-single-digit" : value >= 10 && value < 100 ? "span-crash-double-digit" : value >= 100 ? "span-crash-triple-digit" : ""}>{value}</span>
                        </div>
                      </div>
                    </div>
              
                  ))}
                </div>
                </>
            ))}

          <div className="absolute bottom-0 mb-3 flex justify-center border-footer">
            <p>Últimas <span className="font-bold">sequências máximas</span> de <span className="font-bold">pedras pretas</span> a partir dos resultados na tela</p>
          </div>
          
        </div>
      </div>

    </div>

    <div className="rounded-sm border border-stroke bg-white px-10 py-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-12 xl:pb-6 results-crash">
      <ul id="results-crash">
      </ul>
    </div>

    </>
  );
};

export default Crash;