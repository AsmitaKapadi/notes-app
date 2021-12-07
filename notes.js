const fs = require('fs')
const chalk = require('chalk')
const getNotes = function(){
    return "Your notes..."
}

const addNotes = function(title,body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    })

    if (duplicateNotes.length === 0){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added"))
    }else{
        console.log(chalk.red.inverse("Note exists"))
    }
    
}

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

const removeNotes = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title;
    })
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No note removed.'))
    }
}

module.exports = {
    getNotes : getNotes,
    addNotes : addNotes,
    removeNotes : removeNotes
};