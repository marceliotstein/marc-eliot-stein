var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Expertise Model
 * ===============
 */

var Expertise = new keystone.List('Expertise', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Expertise.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
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
