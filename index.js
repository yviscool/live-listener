const bent = require('bent');
const open = require('open');
const ioHook = require('iohook');
const clipboardy = require('clipboardy');

global.log = console.log.bind(console);

global.request = bent('string', {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
});

global.requestJson = bent('json');

const isWin = process.platform === "win32";

class Live {

    constructor() {

        this.strategies = {};

        this.init();

    }

    init() {

        const IOHookHelper = {
            'win': (event, callback) => event.ctrlKey && event.keycode == 46 && callback(),
            'mac': (event, callback) => event.metaKey && event.keycode == 46 && callback(),
        }

        ioHook.on('keyup', event => {
            IOHookHelper[isWin ? 'win' : 'mac'](event, () => this.start())
        });

        ioHook.start();

        this.add(require('./huya'));
        this.add(require('./bili'));
    }


    add(strategy) {
        this.strategies[strategy.name] = strategy;
    }

    async start() {

        const liveUrl = await clipboardy.read();

        const OpenAppHelper = {
            'win': async (url) => {
                await open(url, { app: 'D:\\software\\PotPlayer\\PotPlayerMini.exe' });
            },
            'mac': async (url) => {
                await open(url);
            },
        }

        Object.entries(this.strategies)
            .filter(strategy => strategy[1].isThisPlatForm(liveUrl))
            .forEach(async ([platformName, klass]) => {
                const url = await new klass(liveUrl.split('?').shift()).parse();
                log(`解析到 ${platformName} 平台的 url 为 ${url}`);
                log('正在打开应用....');
                await OpenAppHelper[isWin ? 'win' : 'mac']();
            })

    }
}


new Live();
