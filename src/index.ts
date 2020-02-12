import commander from 'commander';
import colors from 'colors';
const program = new commander.Command();
program
  .version('0.0.1')
  .option('-c, --city <type>', 'Add city name')
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  program.outputHelp(colors.red);
  process.exit();
}
