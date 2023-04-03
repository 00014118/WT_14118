const express = require ('express')
const app = express()

const fs = require('fs')
const { stringify } = require('querystring')



app.set('view engine' , 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

//Home page
app.get('/', (req, res) => {
    res.render('home')
})

//CREATE and PUSH and ARCHIVE>>
app.get ('/create',(req, res) =>
{
    res.render('create')})

app.post ('/create', (req, res) => {
    const title = req.body.title
    const content = req.body.content

    if (title.trim() === '' && content.trim() === '') {
        res.render('create', {error: true});
    } else {
        fs.readFile('./data/notes.json', (err, data) =>{
            if (err) throw err

            const notes =JSON.parse(data)

            notes.push ({
                id: id (),
                title: title,
                content:content,
                })

            fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
                if(err) throw err

                res.render('create', {success :true } )
                })
            })
         //the archive
        fs.readFile('./data/archives.json', (err, data) =>{
            if (err) throw err
    
            const archives =JSON.parse(data)
    
            archives.push ({
                id: id (),
                title: title,
                content:content,
                })
    
            fs.writeFile('./data/archives.json', JSON.stringify(archives), err => {
                if(err) throw err
    
                
                })
            })
            


        
        }

        
}) 


   //Blog list page>> 
app.get('/notes', (req, res) => {

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        res.render('notes', { notes: notes })

    })
    
})

//Archive

app.get('/archives', (req, res) => {

    fs.readFile('./data/archives.json', (err, data) => {
        if (err) throw err

        const archives = JSON.parse(data)

        res.render('archives', { archives: archives })

    })
    
})

app.get('/archives/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/archives.json', (err, data) => {
        if (err) throw err

        const archives = JSON.parse(data)

        const archive = archives.filter(archive => archive.id == id)[0]

        res.render('archivedetail', { archive: archive})
    })

    
})

//Archive by unique Id
app.get ('/:id/open' , (req, res) => {
    const id= req.params.id

     fs.readFile('./data/archives.json', (err, data) => {
        if (err) throw err

        const archives = JSON.parse(data)

        const archive = archives.filter(archive => archive.id == id)[0]

        res.render('archivedetail', { archive: archive})
    })
})



//Blog by unique Id
app.get('/notes/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        const note = notes.filter(note => note.id == id)[0]

        res.render('detail', { note: note})
    })

    
})

//DELETE

app.get ('/:id/delete' , (req, res) => {
    const id= req.params.id

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        const filterednotes = notes.filter(note => note.id != id)

        fs.writeFile('./data/notes.json' , JSON.stringify(filterednotes), (err) => { 
            if (err) throw err

            res.render('notes', {notes: filterednotes , deleted: true })
        })
    })
})



// UPDATE (SHOW UPDATE FORM)
app.get('/notes/:id/update', (req, res) => {
    const id= req.params.id
  

  
    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err
  
        const notes = JSON.parse(data)
  
        const note = notes.find(note => note.id == id)
  
        res.render('edit', { note: note })
    })
  })
  
  
  
  // UPDATE (PERFORM UPDATE OP)
  app.post('/notes/:id/update', (req, res) => {
    const id= req.params.id
  
    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err
  
        const notes = JSON.parse(data)
  
        const note = notes.find(note => note.id == id)
  
        let idx = notes.indexOf(note)
  
        notes[idx].title = req.body.title
        notes[idx].content = req.body.content
  
        fs.writeFile('./data/notes.json' , JSON.stringify(notes), err => { 
          if (err) throw err
  
          res.redirect('/notes')
        })
    })
  })
  




app.listen(8000, err => {
    if (err)console.log(err)

    console.log('Server is running on port 8000')
})

function id () {
    return'_' + Math.random().toString(36).substring(2, 9);
}

app.use('/images', express.static(process.cwd() + '/images'));