import chalk from "chalk"
import { isMovie } from './helpers.js'
const hr = '-'.repeat(process.stdout.columns)


// display the popular people
const displayPopular = (data) => {
  data.results.map(item => {
    console.log(chalk.white(`\nPerson: \n`));
    console.log(`ID: ${item.id}`);
    console.log(`Name: ${item.name}`);
    item.known_for_department.toLowerCase() === 'acting' && console.log(`${chalk.white('Department:')} ${chalk.magenta(item.known_for_department)}\n`)

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
  const birthday = new Date(data.birthday);
  const month = birthday.toLocaleString('default', { month: 'long' });
  const fullBirthday = `${month} ${birthday.getDate()}, ${birthday.getFullYear()}`;

  console.log(chalk.white(`\n${hr}\n`));
  console.log(chalk.white(`Person: \n`)); 
  console.log(chalk.white(`ID: ${data.id}`));
  console.log(`${chalk.bold.white('Name:')} ${chalk.bold.blueBright(data.name)}`);
  console.log(`${chalk.white('Birthday:')} ${fullBirthday} ${chalk.gray('|')} ${chalk.white(data.place_of_birth)} \n`);
  data.known_for_department.toLowerCase() === 'acting' && console.log(`${chalk.white('Department:')} ${chalk.magenta(data.known_for_department)} \n`)
  console.log(`${chalk.white('Biography:')} ${chalk.bold.blue(data.biography)} \n`);
  
  if (data.also_known_as) {
    console.log(chalk.white('Also known as:'))
    let names = data.also_known_as;
    for (let name of names) {
      console.log(`\t\t ${chalk.white(name)} \n`);
    } 
  } else {
    console.log(`\t\t${data.name} does not have any alternate names \n`)
  }
}


const displayFooter = (pageNo, pageTot) => {
  if (pageNo && pageTot) {
    pageTot > pageNo && console.log(hr + '\n\n' + chalk.white(`Page: ${pageNo} of ${pageTot} \n`));
    console.log(hr)
  }
}


export { displayPerson, displayPopular, displayFooter };