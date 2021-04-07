
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
// this function will render intro page whenever the above link is entered in browser
app.get('/', (req, res) => {
  res.render("intro", { title: "Hi", message: "Welcome" })

})

// this function will enable instructions button and open the instructions page
app.get('/instructions', (req, res) => {
  res.render("instructions", { title: "info", message: "Welcome" })

})


//this function will get us the home page where we can start writing tasks
app.get('/add', (req, res) => {
  fs.readFile('./data/tasks.json', (err, data) => {
    if (err) throw err

    const tasks = JSON.parse(data)

    res.render('home', { tasks: tasks })
  })
})
// this function enables the add button so that the usre input will be added to the list and displayed to the user
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
        description: formData.task,
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

//this function enables remove button so that user can delete tasks if he/she wants to
app.get('/:id/delete', (req,res) => {
  const id = req.params.id

  fs.readFile('./data/tasks.json', (err,data) =>{
    if (err) throw err

    const tasks = JSON.parse(data)

    const filteredTasks  = tasks.filter(task => task.id != id)

    fs.writeFile('./data/tasks.json',JSON.stringify(filteredTasks), (err) => {
      if (err) throw err

      res.render('home', {tasks: filteredTasks, removed: true})
    })
  })
})
// this function allows us to add erasing line to the task name when the task name is clicked
app.get('/:id/update', (req, res) => {

  const id = req.params.id

  fs.readFile('./data/tasks.json', (err, data) =>{
    if (err) throw err

    const tasks = JSON.parse(data)
    const task = tasks.filter(task => task.id == id)[0]

    const taskIds = tasks.indexOf(task)
    const splicedTask = tasks.splice(taskIds, 1)[0]

    splicedTask.done = true

    tasks.push(splicedTask)

    fs.writeFile('./data/tasks.json',JSON.stringify(tasks), (err)  => {
      if (err) throw err

      res.render('home', {tasks: tasks})
    })
  })
})
// basic REST api
app.get('/api/v1/tasks', (req, res) => {
  fs.readFile('./data/tasks.json', (err, data) => {
    if (err) throw err

    const tasks = JSON.parse(data)

    res.json(tasks)
  })
})

app.listen(PORT, (err) =>{
    if (err) throw err

    console.log(`This app is running on port ${ PORT }`)
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }