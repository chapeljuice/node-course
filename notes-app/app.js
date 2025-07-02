import yargs from 'yargs';
import { addNote, editNote, listNotes, readNote, removeNote } from './notes.js';

const y = yargs(process.argv.slice(2));

// create add command
y.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'The contents of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
});

// create remove command
y.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        removeNote(argv.title);
    },
});

// create edit command
y.command({
    command: 'edit',
    describe: 'Edit a note',
    builder: {
        title: {
            describe: 'Existing note title',
            demandOption: false,
            type: 'string',
        },
        newTitle: {
            describe: 'New note title',
            demandOption: false,
            type: 'string',
        },
        newBody: {
            describe: 'New note body',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        editNote(argv.title, argv.newTitle, argv.newBody);
    },
})

// create read commandcls
y.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        readNote(argv.title);
    },
});

// create list command
y.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        listNotes();
    },
});

y.parse();