var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Partner Model
 * ==========
 */

var Partner = new keystone.List('Partner', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Partner.add({
    name: { type: String, required: true },
    type: { type: Types.Select, options: 'Acclerator, VC, Network, Incubator, Corporate, Other', default: 'Acclerator', index: true },
	status: { type: Types.Select, options: 'active, accepted, rejected, expired, applied', default: 'active', index: true },
    creditAmount: { type: Types.Money, format: '$0,0.00' },
    customCredit: { type: Boolean, default: false},
    customShareLink: { type: Types.Url },
    tracking: { type: String },
    formName: { type: String },
    jmpId: { type: String },
    techAdvisor: { type: Boolean, default: false},
    createdDate: { type: Types.Date, index: true, default: Date.now() },
    customUrl: { type: Types.Url },
    contact: { type: Types.Relationship, ref: 'Contact', many: true },
    logo: { type: Types.CloudinaryImage },
    country: { type: String, required: true, default: 'US' },
	region: { type: Types.Select, options: 'APAC, AMER, EMEA, other', default: 'AMER', index: true },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});

Partner.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

Partner.defaultColumns = 'name, type|15%, creditAmount|15%, techAdvisor|15%, status|20%, createdDate|20%';
Partner.register();
