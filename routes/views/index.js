var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		projectlist: [],
		categories: []
	};
	
	// Load the projectlist
	view.on('init', function(next) {
		
		var q = keystone.list('Project').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('categories');
		
		q.exec(function(err, results) {
			locals.data.projectlist = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('index');
	
};
