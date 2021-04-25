/* const { argv } = require('node: process'); */
const yargs = require('yargs');
const { removeNote } = require('./notes');
const notes = require('./notes')


//Create a Command
yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv){
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new Note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing a Note',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a  Note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

console.log(yargs.argv);