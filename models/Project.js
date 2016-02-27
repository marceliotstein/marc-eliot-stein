var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Project.add({
	title: { type: String, required: true },
	location: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	startDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	endDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'ProjectCategory', many: true }
});

Project.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Project.defaultColumns = 'title, state|20%, startDate|20%, endDate|20%';
Project.register();
