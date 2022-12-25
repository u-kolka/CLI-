const argv = require("yargs").argv;
const { listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("invoke list");
      const todos = await listContacts();
      console.table(todos);
      break;

    case "get":
      console.log("invoke get");
      await getContactById(id);
      break;

    case "add":
      console.log("invoke add");
      await addContact(name, email, phone);
      break;

    case "remove":
      console.log("invoke remove");
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);