const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote){  /* duplicateNotes.length === 0 */
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

const saveNotes = (notes) =>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No note removed.'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if(!findNote){
        console.log(chalk.red("No note found"))
    }else{
        console.log(chalk.blue.inverse(findNote.title))
        console.log(findNote.body)
    }
}

module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
};