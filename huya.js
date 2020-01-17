
class Huya {

    constructor(url) {

        this.url = url.replace(/www/, 'm');

        // `https://m.huya.com/${roomId}`;

    }

    static isThisPlatForm(url) {
        const parttern = /https:\/\/www.huya.com\/(.*?)/;
        return parttern.test(url);
    }

    async parse() {
        const res = await request(this.url);
        const pattern = /\/\/.*?m3u8/;
        const matchRes = res.match(pattern);
        if (matchRes) {
            return 'https:' + matchRes[0].replace(/_1200[\s\S]*.m3u8/, '.m3u8');
        }
    }
}


module.exports = Huya