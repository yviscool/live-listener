// const axios = require('axios');
const bent = require('bent');
const open = require('open');
const ioHook = require('iohook');
const clipboardy = require('clipboardy');

global.request = bent('string', {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
})

global.requestJson = bent('json')




class Live {

    constructor() {

        this.strategies = {};

        ioHook.on('keyup', event => {
            if (event.ctrlKey && event.keycode == 46) {
                console.log('坚挺了')
                this.start()
            }
        });

        ioHook.start();


        this.add(require('./huya'));
        this.add(require('./bili'));
    }


    add(strategy) {
        this.strategies[strategy.name] = strategy;
    }


    async start() {


        const webCastUrl = await clipboardy.read();

        Object.entries(this.strategies)
            .filter(strategy => strategy[1].isThisPlatForm(webCastUrl))
            .forEach(async ([, klass]) => {
                const url = await new klass(webCastUrl).parse()
                console.log('解析到 url ' + url)
                console.log('正在打开应用....')
                await open(url, { app: 'D:\\software\\PotPlayer\\PotPlayerMini.exe' });
            })


    }
}


new Live();
