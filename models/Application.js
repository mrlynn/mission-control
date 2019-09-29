var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Application = new keystone.List('Application', {
	nocreate: false,
	noedit: false,
});

Application.add({
	name: { type: Types.Name, required: true },
	company: { type: String, required: true, default: null },
	referenceLink: { type: Types.Url },
	email: { type: Types.Email, required: true, default: null },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'application', label: 'Apply for Accelerator Membership' },
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, label: "Company Description" },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label: "Project Description" },
	},
	message: { type: Types.Markdown },
	createdAt: { type: Date, default: Date.now },
});

Application.defaultSort = '-createdAt';
Application.defaultColumns = 'name, email, enquiryType, createdAt';
Application.register();
