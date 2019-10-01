var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	title: { type: String },
	photo: { type: Types.CloudinaryImage },
	password: { type: Types.Password, initial: true, required: true },
	city: { type: String },
	state: { type: String },
	country: { type: String, default: 'US' },
	location: { type: Types.GeoPoint, required: false },
	region: { type: Types.Select, options: 'APAC, AMER, EMEA, other', default: 'AMER' },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Startup', path: 'startups', refPath: 'name' });


/**
 * Registration
 */
User.defaultColumns = 'name, photo, region, email, isAdmin';
User.register();
