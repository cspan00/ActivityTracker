
exports.up = function(knex, Promise) {
 return knex.schema.createTable('posts', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('author_pic');
   t.string('author');
   t.string('title');
   t.string('address');
   t.string('lat');
   t.string('lng');
   t.string('child_name');
   t.text('picture_url');
   t.text('public_id');
   t.text('description');
   t.integer('hours');
   t.timestamps();
 })
};




exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts');
}
