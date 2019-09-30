var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'partner';
	locals.filters = {
		partner: req.params.parner,
	};
	locals.data = {
		partners: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Partner').model.findOne({
			slug: locals.filters.partner,
		}).populate('name');

		q.exec(function (err, result) {
			locals.data.startup = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Partner').model.find().where('status', 'accepted').sort('-createdDate').populate('name').limit('20');

		q.exec(function (err, results) {
			locals.data.partners = results;
			next(err);
		});

	});

	// Render the view
	view.render('partner');
};
