var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'projects';
	locals.filters = {
		post: req.params.project
	};
	locals.data = {
		projectlist: []
	};
	
	// Load the current project
	view.on('init', function(next) {
		
		var q = keystone.list('Project').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('categories');
		
		q.exec(function(err, result) {
			locals.data.project = result;
			next(err);
		});
		
	});
	
	// Load other projects
	view.on('init', function(next) {
		
		var q = keystone.list('Project').model.find().where('state', 'published').sort('-publishedDate').limit('4');
		
		q.exec(function(err, results) {
			locals.data.projectlist = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('project');
	
};
