const fs = require('fs')
const getNotes = function(){
    return "Your notes..."
}

const addNotes = function(title,body){
    //console.log(title)
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
        console.log("New note added")
    }else{
        console.log("Note exists")
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
module.exports = {
    getNotes : getNotes,
    addNotes : addNotes
};