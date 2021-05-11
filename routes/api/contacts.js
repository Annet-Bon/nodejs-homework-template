const express = require('express')
const router = express.Router()

const Contacts = require('../../model/index')
const { validCreateContact, validUpdateContact } = require('./contacts-validation')

router.get('/', async (req, res, next) => {
	try {
		const contacts = await Contacts.listContacts()

		return res.json({
			status: 'success',
			code: 200,
			data: {
				contacts,
			}
		})
	} catch(err) {
		next(err)
	}
})

router.get('/:contactId', async (req, res, next) => {
	const { contactId } = req.params
	try {
		const contact = await Contacts.getContactById(contactId)

		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
				contact,
				}
			})
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			})
		}
	} catch (err) {
		next(err)
	}
})

router.post('/', validCreateContact, async (req, res, next) => {
	try {
		const contact = await Contacts.addContact(req.body)

		return res.status(201).json({
			status: 'success',
			code: 201,
			data: {
				contact,
			}
		})
	} catch (err) {
		next(err)
	}
})

router.put('/:contactId', validUpdateContact, async (req, res, next) => {
	const { contactId } = req.params
	try {
		const contact = await Contacts.updateContact(contactId, req.body)
		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
				contact,
				}
			})
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			})
		}
	} catch (err) {
		next(err)
	}
})

router.patch('/:contactId', validUpdateContact, async (req, res, next) => {
	const { contactId } = req.params
	try {
		const contact = await Contacts.updateContact(contactId, req.body)

		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
				contact,
				}
			})
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			})
		}
	} catch (err) {
		next(err)
	}
})

router.delete('/:contactId', async (req, res, next) => {
	const { contactId } = req.params
	try {
		const contact = await Contacts.removeContact(contactId)

		if (contact) {
			return res.json({
				status: 'success',
				code: 200,
				data: {
				contact,
				}
			})
		} else {
			return res.status(404).json({
				status: 'error',
				code: 404,
				data: 'Not Found',
			})
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router