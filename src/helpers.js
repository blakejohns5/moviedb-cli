import ora from 'ora';
import chalk from 'chalk';


// FETCH HELPERS

const getHelpers = (options, category) => {
  const params = getSearchParams(options, category);
  const fetchUrl = getUrl(params);  

  return {
    params: params,
    url: fetchUrl,
  }
}

const getSearchParams = (options, category) => {
  const msgFail = `Awww...bummer. No info on that person or movie for you.`;

  if (category === 'person') {
    if (options.I) {
      return {
        category: 'person',
        type: 'id',
        string:  `${options.I}`,
        page: "",
        spinner: {
          startMsg: `Loading ${chalk.magentaBright(`Let's find that person!\n\n`)}`,
          spinMsg: `${chalk.blueBright(`Working on finding the person you are looking for...\n\n`)}`,
          successMsg: `${chalk.white('Found it!')} ${chalk.green('Info retrieved for the person you were looking for!')}\n\n`,
          failMsg: msgFail,
        }
      }
    } else {
      return {
        category: 'person',
        type: 'popular',
        string: 'popular',
        page: `&page=${options.page}`,
        spinner: {
          startMsg: `Loading ${chalk.magentaBright(`OK! Let's find some popular people!\n\n`)}`,
          spinMsg: `${chalk.blueBright(`Working on finding popular people...\n\n`)}`,
          successMsg: `${chalk.white('Wow!')} ${chalk.green('People and movie info retrieved!')}\n\n`,
          failMsg: msgFail,
        }
      }
    }
  }

  if (category === 'movie') {
    if (options.I) {
      return {
        category: 'movie',
        type: 'id',
        string:  `${options.I}`,
        page: "",
        spinner: {
          startMsg: `Loading ${chalk.magentaBright(`Let's get that movie!\n\n`)}`,
          spinMsg: `${chalk.blueBright(`Working on finding the movie you are looking for...\n\n`)}`,
          successMsg: `${chalk.white('Well done us!')} ${chalk.green('Movie info retrieved!')}\n\n`,
          failMsg: msgFail,
        }
      }
    } else {
      return {
        category: 'movie',
        type: 'popular',
        string: 'popular',
        page: `&page=${options.page}`,
        spinner: {
          startMsg: `Loading ${chalk.magentaBright(`OK! Let's find some popular movies!\n\n`)}`,
          spinMsg: `${chalk.blueBright(`Working on finding popular movies...\n\n`)}`,
          successMsg: `${chalk.white('Alright! Yeah!')} ${chalk.green('Popular movies retrieved!')}\n\n`,
          failMsg: msgFail,
        }
      }
    }
  }
}

const getUrl = (params) => {
  const url = `https://api.themoviedb.org/3/${params.category}/${params.string}?api_key=${process.env.API_KEY}${params.page}`;
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


const boxenOpts = {
  titleAlignment: 'center',
  padding: 1,
  margin: 2, 
  borderStyle: 'double'
}



export { getSearchParams, getUrl, getHelpers, spinner, boxenOpts, isMovie };