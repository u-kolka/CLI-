const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDB(updatedContacts) {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

async function listContacts() {
    const contacts = await readDb();
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readDb();
    const contact = contacts.filter((contact) => contact.id === contactId.toString());
    return contact;
}

async function removeContact(contactId) {
    const contacts = await readDb();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId.toString());
    await writeDB(updatedContacts);
    console.table(updatedContacts);
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const contacts = await readDb();

    contacts.push(contact);
    await writeDB(contacts);
    console.table(contacts);
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}