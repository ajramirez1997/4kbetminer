import React, { useEffect, useState, useRef } from 'react';
import Axios from "axios";
import Image from 'next/image';

const Double = () => {
  const [counts, setCounts] = useState({ total: 0, red: 0, white: 0, black: 0 });
  const [numbers, setNumbers] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0 });
  const [FirstRange, setFirstRange] = useState([]);
  const [SecondRange, setSecondRange] = useState([]);
  const [BlackConsecutives, setBlackConsecutives] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [RedConsecutives, setRedConsecutives] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [latestResult, setLatestResult] = useState(0);
  const [latestGameTime, setLatestGameTime] = useState(0);
  const [latestHash, setLatestHash] = useState("");
  const initialized = useRef(false);

  useEffect(() => {

    let intervalResult; 
    const firstRange = [];
    const secondRange= [];
    let consecutive1To7 = [];
    let consecutive8To14 = [];
    var BlackCountConsecutives = 0;
    var RedCountConsecutives = 0;


    const loadPreviousContent = () => {
      const newCounts = { total: 0, red: 0, white: 0, black: 0 };
      Axios.post("https://tipcrash.live:8443/api/sssgame/double", {})
        .then((response) => {
          
          if (consecutive1To7.length > 8) {

            firstRange.push([...consecutive1To7]);
            consecutive1To7 = [];

          }

          if (consecutive8To14.length > 8) {

            secondRange.push([...consecutive8To14]);
            consecutive8To14 = [];

          }

          setLatestResult(response.data.results[0].result);
          setLatestGameTime(response.data.results[0].game_time);
          setLatestHash(response.data.results[0].hash);
    
          response.data.results.forEach((result) => {

            setNumbers((prevNumber) => {
              const newNumbers = { ...prevNumber };
              const number = result.result;
              newNumbers[number]++;
              return newNumbers;
            });
    
            generateContent(result.result, result.game_time, 0);
    
            if (result.result === 0) {
              newCounts.white++;
    
              if (consecutive1To7.length > 4) {

                firstRange.push([...consecutive1To7]);

              }
              if (consecutive8To14.length > 4) {

                secondRange.push([...consecutive8To14]);

              }

              consecutive1To7 = [];
              consecutive8To14 = [];
            } else if (result.result >= 1 && result.result <= 7) {
              RedCountConsecutives++;
              newCounts.red++;
              if (BlackCountConsecutives >= 1 && BlackCountConsecutives <= 4) {
                
                BlackConsecutives[BlackCountConsecutives]++;
                BlackCountConsecutives = 0;

              }else if(BlackCountConsecutives >= 5){

                BlackConsecutives[5]++;
                BlackCountConsecutives = 0;

              }
              consecutive1To7.push(result.result);
    
              if (consecutive8To14.length > 4) {

                secondRange.push([...consecutive8To14]);

              }
        
              consecutive8To14 = [];
            } else if (result.result >= 8 && result.result <= 14) {
              BlackCountConsecutives++;
              newCounts.black++;

              if (RedCountConsecutives >= 1 && RedCountConsecutives <= 4) {
                
                RedConsecutives[RedCountConsecutives]++;
                RedCountConsecutives = 0;

              }else if(RedCountConsecutives >= 5){

                RedConsecutives[5]++;
                RedCountConsecutives = 0;

              }

              consecutive8To14.push(result.result);
    
              if (consecutive1To7.length > 4) {

                firstRange.push([...consecutive1To7]);

              }
              consecutive1To7 = [];
            }
    
            newCounts.total++;
          });
    
          setCounts(newCounts);
          setFirstRange(firstRange);
          setSecondRange(secondRange);
    
          intervalResult = setInterval(() => {
            getNewResults(latestResult, latestGameTime, latestHash);
          }, 5000);
        });
    };
    

    const generateContent = (num, game_time, status) => {
      
        const resultsList = document.getElementById('results');
        
        let bg_color;
        
        if (num == 0) {
            bg_color = "white";
        } else {
            if (num >= 1 && num <= 7) {
              bg_color = "red";
            }else if (num >= 8 && num <= 14){
              bg_color = "black";
            }
        }

        const resultItem = document.createElement('li');
        resultItem.classList.add('result');

        if (status) resultItem.classList.add('added');

        const headDiv = document.createElement('div');
        headDiv.className = 'head ' + bg_color;
        
        if (bg_color == "white") {
            const headImg = document.createElement('img');
            headImg.src = "/images/logo/CrownLogo.webp";
            headDiv.appendChild(headImg);
        } else {
            const span = document.createElement('span');
            span.textContent = num.toString();
            headDiv.appendChild(span);
        }
        let date = new Date(parseInt(game_time) * 1000);
        let options = { timeZone: 'America/Sao_Paulo',  hour12: false };
        let brazilTime = date.toLocaleString('pt', options);
        let [hours, minutes] = brazilTime.split(' ')[1].split(':');
        let formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

        const footDiv = document.createElement('div');
        footDiv.className = 'foot';
        footDiv.textContent = formattedTime;

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

    const getNewResults = (latestResultData, latestGameTime, latestHash) => {
      clearInterval(intervalResult);
        Axios.post("https://tipcrash.live:8443/api/sssgame/double", {}).then((response) => {
          const latestData = response.data.results[0].result;
          const latestDataTime = response.data.results[0].game_time;
          const latestDataHash = response.data.results[0].hash;
          setLatestResult(latestData);
          setLatestGameTime(latestDataTime);
          setLatestHash(latestDataHash);
          
            if (latestHash != latestDataHash && latestHash != "" && latestGameTime != 0 && latestGameTime != latestDataTime) {
                generateContent(latestData, latestDataTime, 1);
                
                  setNumbers(prevNumber => {
                    var newNumbers = { ...prevNumber };

                    newNumbers[latestData]++;

                    return newNumbers;
                });

                setCounts(prevCounts => {

                  const newCounts = { ...prevCounts };

                  if (latestData === 0) {
                      newCounts.white++;
                  } else if (latestData >= 1 && latestData <= 7) {
                    RedCountConsecutives++;
                      newCounts.red++;
                      if (BlackCountConsecutives >= 1 && BlackCountConsecutives <= 4) {
                    
                        BlackConsecutives[BlackCountConsecutives]++;
                        BlackCountConsecutives = 0;
        
                      }else if(BlackCountConsecutives >= 5){
        
                        BlackConsecutives[5]++;
                        BlackCountConsecutives = 0;
        
                      }
                      consecutive1To7.push(latestData);
            
                      if (consecutive8To14.length > 4) {
        
                        secondRange.push([...consecutive8To14]);
        
                      }
                
                      consecutive8To14 = [];
                  } else if (latestData >= 8 && latestData <= 14) {
                    BlackCountConsecutives++;
                      newCounts.black++;
                      if (RedCountConsecutives >= 1 && RedCountConsecutives <= 4) {
                    
                        RedConsecutives[RedCountConsecutives]++;
                        RedCountConsecutives = 0;
        
                      }else if(RedCountConsecutives >= 5){
        
                        RedConsecutives[5]++;
                        RedCountConsecutives = 0;
        
                      }
                      consecutive8To14.push(latestData);
            
                      if (consecutive1To7.length > 4) {
        
                        firstRange.push([...consecutive1To7]);
        
                      }
                      consecutive1To7 = [];
                  }

                  newCounts.total++;

                  return newCounts;

              });

            }

            intervalResult = setInterval(() => {
                getNewResults(latestData, latestDataTime, latestDataHash);
            }, 2000);
        });
    }

    if (!initialized.current) {
        initialized.current = true

        loadPreviousContent();
    }
}, [latestGameTime, latestResult, latestHash]);


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
          <a href='https://www.sssgame.com?code=4160938' target="_blank" className="bg-transparent ml-2 mr-5 w-full sm:w-24 text-center rounded-md" style={{ border: '1px solid #fbff0d', color: '#fbff0d' }}>Double</a>
        </div>

        </div>
      </div>

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper w-full flex flex-col items-center">
        
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-4">Proporção de Cores ( {counts.total} Rounds ) </h2>

        <div className="flex justify-center mt-8 mb-8">
          
          <div className="container flex flex-col justify-center items-center">
            <div className="header w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mb-3">{counts.red}</div>
            <div className="content">
              <div className="box-double-red flex justify-center items-center">
                <div className='circle-double'></div>
              </div>
            </div>
            <div className="footer w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> { counts.total !== 0 ? ((counts.red / counts.total ) * 100).toFixed(2) : 0 }% </div>
          </div>

          <div className="container flex flex-col justify-center items-center mr-10 ml-10">
            <div className="header w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mb-3">{counts.white}</div>
            <div className="content">
              <div className="box-double-white flex justify-center items-center">
                <a href="https://www.sssgame.com?code=4160938" target="_blank"><Image src="/images/logo/CrownLogo.webp" alt="SSSGAME logo" width={300} height={100} /></a>
              </div>
            </div>
            <div className="footer w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> { counts.total !== 0 ? ((counts.white / counts.total ) * 100).toFixed(2) : 0 }% </div>
          </div>
          
          <div className="container flex flex-col justify-center items-center">
            <div className="header w-16 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mb-3">{counts.black}</div>
            <div className="content">
              <div className="box-double-black flex justify-center items-center">
                <div className='circle-double'></div>
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

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
        <div className="custom-y-scrollbar-wrapper flex flex-col items-center mx-3">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white mt-3">Frequência Numérica </h2>

          <div className="flex justify-center mt-3 flex-wrap">

            {Object.keys(numbers).map((number, index) => (
              <div key={index} className="container flex flex-col justify-center items-center mb-2 w-15">
                <div className="content">
                  <div className="smaller-box-double-white flex justify-center items-center">
                      {index === 0 ? (
                        <div className="smaller-box-double-white flex justify-center items-center">
                         <a href="https://www.sssgame.com?code=4160938" target="_blank"><Image src="/images/logo/CrownLogo.webp" alt="SSSGAME logo" width={300} height={100}/></a>
                        </div>
                      ) : index >= 1 && index <= 7 ? (
                        <div className="smaller-box-double-red flex justify-center items-center">
                          <div className='smaller-circle-double'><span className='span-single-digit'>{index}</span></div>
                        </div>
                      ): index >= 8 && index <= 14 ? (
                        <div className="smaller-box-double-black flex justify-center items-center">
                          <div className='smaller-circle-double'><span className={index >= 10 ? 'span-double-digit' : 'span-single-digit'}>{index}</span></div>
                        </div> 
                      ): null}
                  </div>
                </div>
                <div className="footer w-10 bg-opacity-[15%] shadow-md dark:bg-[#1B1B24] flex justify-center items-center mt-3"> {number} X</div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 w-full mb-3 flex justify-center border-footer">
            <p><span className="font-bold">Quantidade</span> de de puxadas no <span className="font-bold">Branco</span> a partir dos resultados na tela</p>
          </div>
          
        </div>
      </div>
      
      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
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
              <div className="flex justify-center flex-wrap">
                  {range.map((value, i) => (
                    
                    <div key={i} className="container flex flex-col justify-center items-center mb-2 w-15">
                      <div className="content">
                        <div className="smaller-box-double-red flex justify-center items-center mr-3">
                          <div className='smaller-circle-double'><span className='span-single-digit'>{value}</span></div>
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
      
      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
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
              <div className="flex justify-center flex-wrap">
                  {range.map((value, i) => (
                    
                    <div key={i} className="container flex flex-col justify-center items-center mb-2 w-15">
                      <div className="content">
                        <div className="smaller-box-double-black flex justify-center items-center mr-3">
                          <div className='smaller-circle-double'><span className={value >= 10 ? 'span-double-digit' : 'span-single-digit'}>{value}</span></div>
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

      <div className="inline-flex rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mx-4 mb-4 flex flex-col items-center relative pb-16">
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

    </div>

    <div className="rounded-sm border border-stroke bg-white px-10 py-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-12 xl:pb-6 results">
      <ul id="results">
      </ul>
    </div>

    </>
  );
};

export default Double;