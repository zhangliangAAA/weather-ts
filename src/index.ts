import commander from 'commander';
import colors from 'colors';
import axios, { AxiosResponse } from 'axios';

const program = new commander.Command();
program
  .version('0.0.1')
  .option('-c, --city <type>', 'Add city name')
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  program.outputHelp(colors.red);
  process.exit();
}

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}

interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const Url = 'https://restapi.amap.com/v3/weather/weatherInfo';
const Key = 'a10da12ad2985521af2bd9185a8117ed';

axios
  .get(`${Url}?key=${Key}&city=${encodeURI(program.city)}`)
  .then((res: AxiosResponse<IWeatherResponse>) => {
    const live = res.data.lives[0];
    // tslint:disable-next-line:no-console
    console.log(colors.yellow(live.reporttime));
    // tslint:disable-next-line:no-console
    console.log(colors.white(live.province));
    // tslint:disable-next-line:no-console
    console.log(colors.green(live.weather));
  })
  .catch(err => {
    // tslint:disable-next-line:no-console
    console.log(colors.red('天气服务异常'));
  });
