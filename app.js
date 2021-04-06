
// third party libraries
const express = require('express')
const app = express()

// node libraries
const fs = require('fs')
const PORT = 8000

app.set('view engine', 'pug')
app.use('/static', express.static('public')) 
app.use(express.urlencoded({ extended: false }))

// http://localhost:8000
app.get('/', (req, res) => {
  fs.readFile('./data/tasks.json', (err, data) => {
    if (err) throw err

    const tasks = JSON.parse(data)

    res.render('home', { tasks: tasks })
  })

})
app.post('/add', (req, res) => {
  const formData = req.body

  if (formData.task.trim() == '') {
    fs.readFile('./data/tasks.json', (err, data) => {
      if (err) throw err

      const tasks = JSON.parse(data)

      res.render('home', { error: true, tasks: tasks })
    })
  } else {
    fs.readFile('./data/tasks.json', (err, data) => {
      if (err) throw err

      const tasks = JSON.parse(data)

      const task = {
        id: id(),
        description: formData.todo,
        done: false
      }

      tasks.push(task)

      fs.writeFile('./data/tasks.json', JSON.stringify(tasks), (err) => {
        if (err) throw err

        fs.readFile('./data/tasks.json', (err,data) => {
          if (err) throw err

          const tasks = JSON.parse(data)

          res.render('home', { success: true, tasks: tasks })
        })
      })
    })
  }
})

app.listen(PORT, (err) =>{
    if (err) throw err

    console.log(`This app is running on port ${ PORT }`)
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }