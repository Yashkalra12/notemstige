const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes.js')
const chalk = require('chalk')

yargs.version('1.1.0')
console.log(notes.getNotes(chalk.inverse.blue.bold("... | Your Notes | ...")))

//Adding a note

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {    //used to support additional options for reading a note
        title: {
            describe: 'Note title added',
            demandOption: true, //will help to produce an error if no title is given
            type: 'string'  //will print a string even if title is empty (--title)
        },
        body: {
            describe: 'Note info added',
            demandOption: true,
            type: 'string'  
        }
    },
    handler(argv){
        console.log("Title: " + argv.title)
        console.log("Description: " + argv.body)
        notes.addNote(argv.title,argv.body)
    }

})

//Remove a note

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note to be removed',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv){
        console.log("Removing the note...")
        notes.removeNote(argv.title)
    }

})

//list all notes from JSON file

yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler(){
        console.log("Listing all your notes...")
        notes.listNotes()
    }

})

//read an individual note

yargs.command({
    command: 'read',
    describe: 'Read a new note',
    builder:{
        title: {
            describe: 'note to be read',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv){
        console.log("Reading a note...")
        notes.readNote(argv.title)
    }

})

yargs.parse()//we use this so that the arguments get parsed and not printed twice
//console.log(yargs.argv) //will parse but also print