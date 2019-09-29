var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'advisors';
	locals.filters = {
		advisor: req.params.post,
	};
	locals.data = {
		advisors: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('User').model.findOne({
			type: 'advisor',
			slug: locals.filters.post,
		}).populate('name email title photo');

		q.exec(function (err, result) {
			locals.data.advisor = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('User').model.find().where('type', 'advisor').sort('name.last').populate('name').limit('20');

		q.exec(function (err, results) {
			locals.data.advisors = results;
			next(err);
		});

	});

	// Render the view
	view.render('advisors');
};
