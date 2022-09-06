import chalk from "chalk"
import boxen from "boxen"
const hr = '-'.repeat(process.stdout.columns)


const boxenOpts = {
  titleAlignment: 'center',
  padding: 1,
  margin: 1, 
  borderStyle: 'double'
}


const showPopularPeople = (data) => {
  data.map(item => {
    console.log(`Person: \n`)
    console.log(`id: ${item.id}`)
    console.log(`name: ${item.name}`);
    item.known_for_department.toLowerCase() === 'acting' && console.log(chalk.magenta(item.known_for_department))
    
    if (isMovie(item.known_for)) {
      item.known_for.map(item => {
        if (item.media_type.toLowerCase() === 'movie') {          
          
          console.log(chalk.white('\t Movie: '));
          console.log(chalk.white('\t id: ' + item.id));
          console.log(chalk.white('\t Released: ' + item.release_date));
          console.log(chalk.white('\t Title: ' + item.title));
          console.log('\n');
        }
      })     
    } else {
      console.log(chalk.cyanBright(`\n\t ${item.name} does not appear in any movies.\n`))
    }


    console.log('\n\n' + hr)
    
  })
  
}

const isMovie = (work) => {
  return work.some(item => item.media_type.toLowerCase() === 'movie')
}






export default showPopularPeople;
// export { boxenOpts };