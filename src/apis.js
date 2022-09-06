import https from 'node:https';
import ora from 'ora'
import chalk from 'chalk'

import showPopularPeople from './display.js';



// get popular people
const getPopularPeople = (options) => {
  let pageNo = options.page;
  let pageTot = null; 
  let popularPeople = null;
  

  https.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&page=${pageNo}`, res => {
    
  const spinner = ora({
    spinner: 'earth',
    interval: 100,
    text: `Loading ${chalk.magentaBright('Get ready for some movie info!\n\n')}`
  }).start();    
    
    
    let data = [];
      
      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', (pageNo, pageTot) => {
        const fetchedData = JSON.parse(Buffer.concat(data).toString());    
        pageNo = fetchedData.page;
        pageTot = fetchedData.total_pages;
        popularPeople = fetchedData.results;
        console.log(pageNo, pageTot)

        setTimeout(() => {      
          spinner.color='white'          
          spinner.succeed('Movie info retrieved!!')       
          // showPopularPeople(popularPeople)
          // console.log(popularPeople)
          
          pageTot > pageNo && console.log(chalk.white(`Page: ${pageNo} of ${pageTot}`));
          
        }, 500);
        
        showPopularPeople(popularPeople)  
      })
      
    }).on('error', err => {
      console.log('Error: ', err.message);
      spinner.fail('Awww...bummer. No movie info.')
    });
    
}

export default  getPopularPeople ;

