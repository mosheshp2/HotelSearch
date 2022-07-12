const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello from backend!')
})

app.use(express.static(__dirname + '/static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})