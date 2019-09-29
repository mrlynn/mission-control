var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Startup').model.findOne({
			status: 'accepted',
			slug: locals.filters.startup,
		}).populate('name');

		q.exec(function (err, result) {
			locals.data.startup = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Startup').model.find().where('status', 'accepted').sort('name').populate('name').limit('4');

		q.exec(function (err, results) {
			locals.data.startups = results;
			next(err);
		});

	});

	// Render the view
	view.render('test');
};
