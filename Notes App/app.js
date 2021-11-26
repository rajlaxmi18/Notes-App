const yargs = require("yargs");
const notes = require("./notes.js");

yargs.command({
  command: "add",
  describe: "Add a note in the app",
  builder: {
    title: {
      describe: "Note title",
      demandOptions: true,
      type: "string",
    },
    description: {
      describe: "Note description",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.description);
  },
});

yargs.command({
  command: "remove",
  describe: "Removes a note from the app",
  builder: {
    title: {
      describe: "Note title",
      demandOptions: true,
      type: "string",
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List all the items from the app",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reads all the elements from the notes app",
  builder: {
    title: {
      describe: "Note title",
      demandOptions: true,
      type: "string",
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

console.log(yargs.argv);
