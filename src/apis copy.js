


// function to fetch popular people from api
const getPeople = (options) => {
  // get string variable from searchType argument, to include in fetch url
  let searchBy = null;
  let urlString = '';
  if (options.I) {
    searchBy = 'id';    
    urlString = `${options.I}`
  } else {
    searchBy = urlString = 'popular';
  }
  
  // get pageNo from options, if it exists, to add to url
  const pageNo = options.page ? `&page=${options.page}` : '';
  // declare variables to adding page location at bottom of readout
  let pageTot = null; 
  let popularPeople = null;

  let url = `https://api.themoviedb.org/3/person/${urlString}?api_key=${process.env.API_KEY}${pageNo}`;
  // fetch data from api using https.get from node
  
  https.get(url, res => {  
    // start spinner while data is being fetched
    console.log(searchBy)
    spinner.start(`Loading ${chalk.magentaBright('Get ready for some movie info!\n\n')}`);    
    let data = [];      
    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', (pageNo, pageTot, searchBy) => {
      const fetchedData = JSON.parse(Buffer.concat(data).toString());    
      // set pageNo if search is for popular people and results have page numbers
      if (fetchedData.page) {
        pageNo = fetchedData.page;
        pageTot = fetchedData.total_pages
      }

      setTimeout(() => {      
        spinner.color='white'          
        spinner.succeed('Movie info retrieved!!')
        pageTot > pageNo && console.log(chalk.white(`Page: ${pageNo} of ${pageTot}`));
      }, 500);
      
      console.log( fetchedData.results + '\n\n\n')
      console.log(searchBy)
      // callDisplayFunction(searchBy, fetchedData.results);
      
    })
      
    }).on('error', err => {
      console.log('Error: ', err.message);
      spinner.fail('Awww...bummer. No movie info.')
    });
    
}



