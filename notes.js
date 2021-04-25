const fs = require('fs');
const chalk = require('chalk');


const getNotes = function () {
    console.log(notes);
}

const addNote = function(title, body) {
    const notes = loadNote();

    const duplicateNote = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNote.length === 0){
        notes.push ({
            title: title,
            body: body
        })
    
        saveNote(notes);
        console.log(chalk.green.inverse("New Note added"));
    } else {
        console.log(chalk.red.inverse("Note title taken"));
    }
    
console.log(notes);
}

const saveNote = function (notes) { 
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);

}

const loadNote = function() {
   try {
       const dataBuffer = fs.readFileSync('notes.json');
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
   }
    catch (error) {
        return []
    }
}

const removeNote = function (title) {

        const notes = loadNote();
        const notestokeep = notes.filter(function (note) {
            return note.title !== title
        })

        if(notes.length > notestokeep.length){
            console.log(chalk.green.inverse("Notes Removed"));
            saveNote(notestokeep);
        } else {
            console.log(chalk.red.inverse("No Note found"));
        }

       
}

const listNotes = () => {
    const notes = loadNote();

    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNote();

    const note = notes.find((note) => (
        note.title === title
    ))
    
    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("Note not found!"));
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

