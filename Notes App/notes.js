const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, description) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);
  if (!duplicateNotes) {
    notes.push({
      title: title,
      description: description,
    });
    saveNotes(notes);
    console.log("New note added!!");
  } else {
    console.log("Note title already exists!!");
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length < notes.length) {
    const removedMsg = chalk.green.inverse("Note removed!!");
    console.log(removedMsg);
    saveNotes(notesToKeep);
  } else {
    const notRemovedMsg = chalk.red.inverse("No note found!!");
    console.log(notRemovedMsg);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.yellow.inverse("Your Notes!!"));
    notes.forEach((note) => {
      console.log(note.title);
    });
  } else {
    console.log(chalk.yellow.inverse("No notes available!!"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const desiredNote = notes.find((note) => note.title === title);
  if (desiredNote) {
    console.log(chalk.blue.inverse(desiredNote.title));
    console.log(desiredNote.description);
  } else {
    console.log(chalk.red.inverse("No such note is present!!"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
