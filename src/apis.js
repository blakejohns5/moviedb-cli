import https from 'node:https';

// get popular people
const getPopularPeople = (options) => {
  const pageNumber = `${options.page}`
  // console.log(options.options.page)
    https.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&page=${pageNumber}`, res => {
        let data = [];

        res.on('data', chunk => {
          data.push(chunk);
        });

        res.on('end', () => {
          console.log('Response ended: ');
          const results = JSON.parse(Buffer.concat(data).toString());
          console.log(results)
          for (let result in results) {
            console.log(result)
            
          }
        })
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
}



export default  getPopularPeople ;