const express = require("express")
const app = express()
const port = 3000

//for handling POST requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send("Welcome to Date Planner!")
})

const datePlannerRoutes = require("./routes/datePlanner")
app.use(datePlannerRoutes)

app.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})