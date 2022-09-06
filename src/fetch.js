import https from 'node:https';
import chalk from 'chalk'
import { spinner } from './helpers.js'
import { displayPerson, displayPopular, displayFooter } from './display.js'




const fetchData = (helpers) => {
  const [url, params] = [helpers.url, helpers.params];
 
  https.get(url, res => {  
    spinner.start(`Loading ${chalk.magentaBright('Get ready for some movie info!\n\n')}`);
    
    let data = [];      
    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
      const fetchedData = JSON.parse(Buffer.concat(data).toString());
      const [page, pageTot] = [fetchedData.page, fetchedData.total_pages]
      

      setTimeout(() => {      
        spinner.color='white'          
        spinner.succeed('Movie info retrieved!!')
        displayFooter(page, pageTot);  
      }, 500);

      // pass fetchedData to function to console.log data
      handleFetchedData(fetchedData, params);      
      
      
    }).on('error', err => {
      console.log('Error: ', err.message);
    });    
  }) 
}


const handleFetchedData = (data, params) => {
  switch (params.type) {
    case 'id': 
      displayPerson(data);
      break;
    case 'popular':
      displayPopular(data);
      break;
    default:
      return;
  }
}





export { fetchData };

