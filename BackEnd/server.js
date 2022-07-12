const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const { myApiSearcher } = require('./MyApiSearcher');
const { group } = require('console');


app.get('/api/getSearchApis', (req, res) => {
  const { groupSize } = req.query;

  const apisArr = [...myApiSearcher.getRequestArr(+groupSize)];
  // duplicate this per API implementation

  res.json(apisArr);
});



app.get('/api/searchApiConcrete', (req, res) => {
  const { groupSize, destination, start, end, apiType } = req.query;

  if (apiType === 'my') {
    // should be done by async await, and relevant mappers per API
    myApiSearcher.searchHotels({ groupSize, destination, start, end })
      .then(result => {
        console.log(result.data);

        res.send(result.data);
      });
  }

});

app.get('/static/resorts.json', (req, res) => {
  res.write()
});

app.use(express.static(__dirname + '/static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})