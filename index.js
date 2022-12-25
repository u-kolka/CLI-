const argv = require("yargs").argv;
const { listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("invoke list");
      const contactList = await listContacts();
      console.table(contactList);
      break;

    case "get":
      console.log("invoke get");
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      console.log("invoke add");
      const newContact = await addContact(name, email, phone);
      break;

    case "remove":
      console.log("invoke remove");
      const removedContact = await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);