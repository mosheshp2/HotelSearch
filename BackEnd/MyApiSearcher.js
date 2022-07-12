const axios = require('axios');
const { isAnyArrayBuffer } = require('util/types');

class MyApiSearcher /*implement IApiSearch*/  {

    MAX_GROUP_SIZE = 4;
    serverUrl = 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';

    searchHotels(model) {
        return axios.post(this.serverUrl, { 
            query: {
                "ski_site": 1,
                "from_date": "03/04/2022",
                "to_date": "03/11/2022",
                "group_size": model.groupSize
            }
        });
    }

    getRequestArr(size) {
        const arr = [];
        // can be done smarter next time :-)
        // Array.from(Array(MAX - size)).map((i) => ({}))...

        for (let i = size; i <= this.MAX_GROUP_SIZE; i++) {
            arr.push({ group: i, apiType: 'my' });
        }

        return arr;
    }
}
module.exports = {
    myApiSearcher: new MyApiSearcher()
};