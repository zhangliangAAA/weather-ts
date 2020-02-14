import commander from 'commander';
import colors from 'colors';
import axios, { AxiosResponse } from 'axios';
import child from 'child_process';

const program = new commander.Command();
program
	.version('0.0.1')
	.option('-c, --city [city]', 'enter the city you want to query', '上海')
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

async function getWeatherByCity(city: string) {
	try {
		const queryUrl = `${Url}?key=${Key}&city=${encodeURI(city)}`;
		const res: AxiosResponse<IWeatherResponse> = await axios.get(queryUrl);
		const live = res.data.lives[0];
		const info = `${colors.white(live.province)}：${colors.green(live.weather)},${colors.blue(
			live.temperature
		)}℃,${colors.magenta(live.reporttime)}`;
		console.log(info);
		child.exec(`touch querylogs.log`, (err, sto) => {
			if (err) console.log('err:' + err);
		});
		child.exec(`echo "${info}" >> querylogs.log`, (err, sto) => {
			if (err) console.log('err2:' + err);
		});
	} catch (error) {
		console.log(colors.red('天气服务异常' + error));
	}
	console.log(colors.yellow('========查询完毕===你可以继续查询======='));
}
getWeatherByCity(program.city);

/** 以下为监听输入变化 */
const standardInput = process.stdin;
standardInput.setEncoding('utf-8');
// When user input data and click enter key.
standardInput.on('data', (data: string) => {
	// User input exit.
	if (data === 'exit\n') {
		// Program exit.
		console.log('User input complete, program exit.');
		process.exit();
	} else {
		getWeatherByCity(data.replace('\n', ''));
	}
});
