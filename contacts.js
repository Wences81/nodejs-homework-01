const { v4: uuidv4 } = require("uuid")
const fs = require("fs").promises;
const path = require("path");


const contactsPath = path.resolve("./db/contacts.json");

fs.readFile(contactsPath, "utf8", (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  const json = JSON.parse(data)
  console.log(json)
})



async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8")
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => contact.id === Number(contactId));
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(contact => contact.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
    return newContactList;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone }
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const newContactList = [...parsedContacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2), "utf8")
    return newContactList;
  } catch (error) {
    console.log(error.message)
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}