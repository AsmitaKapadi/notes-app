const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
//const note = getNotes()
//console.log(chalk.green('Success!'))
/* console.log(process.argv)
console.log(yargs.argv) */

yargs.command({
    command: 'add',
    describe: 'Add a new note!',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title,argv.body)
        //console.log('Body of note =',argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    handler: function(){
        console.log('Removing a note!')
    }
})

yargs.command({
    command: 'list',
    describe: 'List data',
    handler: function(){
        console.log('Listing!')
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note!',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true
        }
    },
    handler: function(argv){
        console.log('Reading a note!',argv)
    }
})

console.log(yargs.argv)