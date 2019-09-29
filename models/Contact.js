var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Contact Model
 * =============
 */

var Contact = new keystone.List('Contact', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Contact.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: false },
	phone: { type: String },
	title: { type: String },
    twitterURL: { type: Types.Url },
	photo: { type: Types.CloudinaryImage },
	contactType: { type: Types.Select, options: [
		{ value: 'partner', label: 'Partner' },
		{ value: 'founder', label: 'Startup Founder/Co-Founder' },
		{ value: 'advisor', label: 'Technical Advisor' },
		{ value: 'admin', label: 'Administrator' },
		{ value: 'other', label: 'Something else...' },
    ] },
    startup: { type: Types.Relationship, ref: 'Startup', many: false, dependsOn: { contactType: ['founder','other']}},
    notes: { type: Types.Markdown },
    partner: { type: Types.Relationship, ref: 'Partner', many: false, dependsOn: { contactType: ['partner'] } },
    createdAt: { type: Date, default: Date.now },
    country: { type: String, required: true, default: 'US' },
	region: { type: Types.Select, options: 'APAC, AMER, EMEA, other', default: 'AMER', index: true }
});

Contact.defaultSort = '-createdAt';
Contact.relationship({path:'startup', ref: 'Startup', refPath: 'contacts', many: true });
Contact.defaultColumns = 'name, email, contactType, createdAt';
Contact.register();
