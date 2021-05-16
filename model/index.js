const db = require('./db')
const { v4: uuidv4 } = require('uuid')

const listContacts = () => {
  	return db.get('contacts').value()
}

const getContactById = (contactId) => {
	return db.get('contacts').find(({ id }) => id.toString() === contactId).value()
}

const removeContact = (contactId) => {
	const record = db.get('contacts').remove(({ id }) => id.toString() === contactId).write()

	return record
}

const addContact = (body) => {
	const id = uuidv4()
	const record = {
		id,
		...body,
	}
	db.get('contacts').push(record).write()

	return record
}

const updateContact = (contactId, body) => {
	const record = db
		.get('contacts')
		.find(({ id }) => id.toString() === contactId)
		.assign(body)
		.value()
	db.write()

	return record.id ? record : null
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
}
