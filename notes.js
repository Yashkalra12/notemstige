const fs = require('fs')
const chalk = require('chalk')

const getNotes = function (str){
    return str
}

const addNote  = (title, body)=>{
    const notes = loadNotes()
    const duplicteNote = notes.find((note)=>
         note.title === title)

    if(!duplicteNote){
        console.log(chalk.bgGreen.bold("Note added successfully !"))
        notes.push({
            title: title,
            body: body
        })
    }else{
        console.log(chalk.bgRed.black("Note could not be added (Title is already used)"))

    }
    
    saveNotes(notes)
}

const removeNote = (title)=>{
    
    const notes = loadNotes()
    console.log(title)
    const findfilter = notes.filter((note)=>note.title !== title)
    const findtitle = notes.filter(function(note){
        return(note.title === title)

    })
    if(findtitle.length != 0){
        console.log(chalk.bgGreen.bold("Note removed successfully !"))
    }
    else{
        console.log(chalk.bgRed.black("Note not removed"))
    }
    saveNotes(findfilter)
}

const listNotes = ()=>{
    const notes = loadNotes()
    i = 1
    notes.forEach((note) => {
        console.log("Note "+i+" :")
        console.log(chalk.bold.blue(note.title))
        console.log(chalk.italic(note.body))
        i+=1
        console.log(" ")
    });
    if(notes.length == 0){
        console.log(chalk.bgRed.black("No notes found")) 
    }

}

const readNote = (title)=>{
    
    obj={
        title: '',
        body: ''
    }
    const notes = loadNotes()
    console.log(title)
    const findNote = notes.find((note)=>note.title == title)
    notes.forEach((note)=>{
        if(note.title == title){
            obj.title = note.title
            obj.body = note.body
        }
    })
    if(findNote){
        console.log(chalk.bgGreen.bold("Note found successfully !"))
        console.log(chalk.bold.blue(obj.title))
        console.log(chalk.italic(obj.body))
       
    }
    else{
        console.log(chalk.bgRed.black("Note not found"))
    }
    
}

//Saving notes to JSON file

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

//reading notes from JSON file

const loadNotes = () => {
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)

    }
    catch (e){
        return []

    }
}

//exporting modules to app.js

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
