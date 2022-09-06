import ora from 'ora';


// FETCH HELPERS

const getHelpers = (options) => {
  const params = getSearchParams(options);
  const fetchUrl = getUrl(params);  

  return {
    params: params,
    url: fetchUrl,
  }
}

const getSearchParams = (options) => {
  if (options.I) {
    return {
      type: 'id',
      string:  `${options.I}`,
      page: "",
    }
  } else {
    return {
      type: 'popular',
      string: 'popular',
      page: `&page=${options.page}`,
    }
  }
}

const getUrl = (params) => {
  const url = `https://api.themoviedb.org/3/person/${params.string}?api_key=${process.env.API_KEY}${params.page}`;
  return url;
}


// style helper for fetch
const spinner = ora({
  spinner: 'earth',
  interval: 100,
})

// DISPLAY HELPERS

// display for popular people
const isMovie = (work) => {
  return work.some(item => item.media_type.toLowerCase() === 'movie')
}


// const boxenOpts = {
//   titleAlignment: 'center',
//   padding: 1,
//   margin: 1, 
//   borderStyle: 'double'
// }



export { getSearchParams, getUrl, getHelpers, spinner, isMovie };