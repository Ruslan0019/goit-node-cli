const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  // Повертає масив контактів.
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  //  Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  //  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) return null;
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(
      "User with this id was not found! Please enter the correct id!"
    );
  }
}

async function addContact(name, email, phone) {
  //  Повертає об'єкт доданого контакту (з id).
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
