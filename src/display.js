import chalk from "chalk"
import { isMovie } from './helpers.js'
const hr = '-'.repeat(process.stdout.columns)


// call the correct display function depending on the search params for the type of search
const callDisplayFunction = (searchBy, data) => {
  switch (searchBy) {
    case 'id': 
      showPopularPeople(data);
      break;
    case 'popular': 
      showPerson(data);
      break;
    default: 
      return;
  }
}

// display the popular people
const displayPopular = (data) => {
  data.results.map(item => {
    console.log(chalk.white(`\nPerson: \n`));
    console.log(`ID: ${item.id}`);
    console.log(`Name: ${item.name}`);
    item.known_for_department.toLowerCase() === 'acting' && console.log(chalk.magenta(`${item.known_for_department}:`))

    if (isMovie(item.known_for)) {
      item.known_for.map(item => {
        const date = new Date(item.release_date);
        const month = date.toLocaleString('default', { month: 'long' });

        if (item.media_type.toLowerCase() === 'movie') {
          console.log(chalk.blueBright('\t Movie: '));
          console.log(chalk.white('\t Movie ID: ' + item.id));
          
          console.log(chalk.white(`\t Released on: ${month} ${date.getDate()}, ${date.getFullYear()}`));
          console.log(chalk.white('\t Title: ') + chalk.italic.greenBright(item.title));
          console.log('\n');
        }
      })     
    } else {
      console.log(chalk.cyanBright(`\n\t ${item.name} does not appear in any movies.\n`))
    }
    console.log('\n' + hr)
  })
}


const displayPerson = (data) => {
  console.log(`\n` + hr )
}



const displayFooter = (pageNo, pageTot) => {
  if (pageNo && pageTot) {
    pageTot > pageNo && console.log(hr + '\n\n' + chalk.white(`Page: ${pageNo} of ${pageTot} \n`));
    console.log(hr)
  }
  
}


export { displayPerson, displayPopular, displayFooter };