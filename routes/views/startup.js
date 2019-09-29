var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'startup';
	locals.filters = {
		startup: req.params.startup,
	};
	locals.data = {
		startups: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Startup').model.findOne({
			slug: locals.filters.startup,
		}).populate('name');

		q.exec(function (err, result) {
			locals.data.startup = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Startup').model.find().where('status', 'accepted').sort('-createdDate').populate('name').limit('20');

		q.exec(function (err, results) {
			locals.data.startups = results;
			next(err);
		});

	});

	// Render the view
	view.render('startup');
};
