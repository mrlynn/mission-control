var keystone = require('keystone');
var Types = keystone.Field.Types;
var moment = require('moment');


/**
 * Post Model
 * ==========
 */

var Startup = new keystone.List('Startup', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: false },
});

function defaultCohort () {
    var currMonthName  = moment().format('MMMM');
    var currYear  = moment().format('YY');
    var today = new Date();
    //get current month
    var curMonth = today.getMonth();
     
    var fiscalYr = "";
    if (curMonth > 3) { //
        var nextYr1 = (today.getFullYear() + 1).toString();
        fiscalYr = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
        var nextYr2 = today.getFullYear().toString();
        fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }
    var quarter = Math.floor((today.getMonth() + 3) / 3);
    var nextq;
    if (quarter == 4) {
        nextq = new Date (today.getFullYear() + 1, 1, 1);
    } else {
        nextq = new Date (today.getFullYear(), quarter * 3, 1);
    }
    return "FY" + fiscalYr + quarter + currMonthName
}

Startup.add({
    name: { type: String, required: true, label: "Company Name" },
    companyUrl: { type: Types.Url },
    referenceLink: { type: Types.Url, label: "Angle or Crunchbase URL"},
	status: { type: Types.Select, options: 'accepted, rejected, expired, applied, pending', default: 'accepted', index: true },
    rejectReason: { type: String, dependsOn: { status: ['rejected']}},
    rejectedInSDFC: { type: Boolean },
    advisor: { type: Types.Relationship, ref: 'User', index: true },
    advisorName: { type: String },
	contacts: { type: Types.Relationship, ref: 'Contact', index: true, noedit: false },
    logo: { type: Types.CloudinaryImage },
    city: { type: String, required: false },
    country: { type: String, default: 'US' },
	region: { type: Types.Select, options: 'APAC, AMER, EMEA, other', default: 'AMER' },
    partner: { type: Types.Relationship, ref: 'Partner', many: false },
    partnerName: { type: String, required: false, label: "Partner Name" },
    activationCodes: { type: Types.TextArray },
    cohort: { type: String, default: defaultCohort },
    stage: { type: Types.Select, options: 'Pre-seed, Seed, Public, NA, Other', default: 'Seed' },
    socialLink: { type: Types.Url, label: "Social Link"},
    acceptedInSDFC: { type: Boolean },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
    notes: { type: Types.Relationship, ref: 'Note', many: true}
});

Startup.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

Startup.schema.virtual('partnerAligned').get(function() {
    if (this.partner == '' || this.partner == 'None') {
        return false;
    } else {
        return true;
    }
});

 Startup.relationship({path:'notes', ref: 'Note', refPath: 'startup', many: true });

Startup.defaultColumns = 'name|10%, logo|10%, companyUrl|20%, cohort|20%, status|10%, country|5%, region|10%, publishedDate|10%, partnerAligned|10%';
Startup.register();
