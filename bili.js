
class Bili {

    constructor(url) {

        this.rid = url.replace(/.*?com\/.*?/, '');


    }


    static isThisPlatForm(url) {
        const pattern = /https:\/\/live.bilibili.com\/.*?/;
        return pattern.test(url);
    }

    async getRealId() {

        const { data } = await requestJson(`https://api.live.bilibili.com/room/v1/Room/room_init?id=${this.rid}`)

        return data;
    }

    async parse() {

        const data = await this.getRealId()

        if (data) {
            const { room_id, live_status } = data;

            if (live_status) {
                const { data: { play_url: { durl } } } = await requestJson(`https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomPlayInfo?room_id=${room_id}&play_url=1&mask=1&qn=2&platform=web`);
                return durl[durl.length - 1].url;
            }

        }
    }
}



module.exports = Bili