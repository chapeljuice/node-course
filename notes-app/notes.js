import fs from 'fs';
import chalk from 'chalk';

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

export const addNote = (title, body) => {
    const notes = loadNotes();

    if (!title || !body) {
        console.log(chalk.red.bold.inverse('You must provide a title and body!'));
        return;
    }

    const duplicateNote = notes.find((note) => note.title === title);

    if (duplicateNote) {
        console.log(chalk.red.bold.inverse('A note with this title already exists!'));
        return;
    }

    notes.push({ title, body });
    saveNotes(notes);
}

export const editNote = (title, newTitle, newBody) => {
    const notes = loadNotes();
    const isNoteTitleFound = notes.find((note) => note.title === title);

    if (title && isNoteTitleFound) {
        const noteIndex = notes.findIndex((note) => note.title === title);

        if (newTitle) {
            // edit title
            notes[noteIndex].title = newTitle;
            console.log(chalk.green.bold.inverse('Title Updated!'));
        } else if (newBody) {
            // edit body
            notes[noteIndex].body = newBody;
            console.log(chalk.green.bold.inverse('Body Updated!'));
        } else {
            console.log(chalk.red.bold.inverse('No new details provided!'));
        }
    } else {
        console.log(chalk.red.bold.inverse('You must provide an existing note title!'));
    }

    saveNotes(notes);
}

export const listNotes = () => {
    const notes = loadNotes();

    if (notes.length > 0) {
        console.log(chalk.blue.bold.inverse('Your notes:'));
        notes.forEach((note) => {
            console.log(chalk.yellow.italic(` - ${note.title}`));
        });
    } else {
        console.log(chalk.red.bold.inverse('No notes found!'));
    }
}

export const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(`${chalk.bold.yellow(note.title)} ${chalk.bold.blue(note.body)}`);
    } else {
        console.log(chalk.red.bold.inverse('Note not found!'));
    }
}

export const removeNote = (title) => {
    const notes = loadNotes();
    const isNoteFound = notes.find((note) => note.title === title);

    if (isNoteFound) {
        const filteredNotes = notes.filter((note) => note.title !== title);
        saveNotes(filteredNotes);
        console.log(chalk.green.bold.inverse('Note Removed!'));
    } else {
        console.log(chalk.red.bold.inverse('Note Not Found!'));
    }
}
