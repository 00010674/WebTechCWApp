# Tasks Web Application

### This web application allows users to create, update and delete tasks

To run this web application locally, follow the instructions below

1. Clone this repository
```bash
git clone https://github.com/00010674/WebTechCWApp.git
```

2. Install dependencies
```bash
cd [project folder]
npm install
```

3. Run the application
```bash
node app
```

### Dependencies of the web application
- express.js
- pug.js

### Web application repository on github

https://github.com/00010674/WebTechCWApp.git

### Explanaition to not fully following the project structure recommended in the cw description

I did not add routes folder to store functions and handlers for different pages. The reason for that is that I have only 2 extra functions: 'start writing task1' and 'instructions' Both of them did not need a lot of lines code to be initiated. So in order to decrease the amount of work, I decided to add comments to all the function/handler codes. This way, I specified to which handler a certain function is related to