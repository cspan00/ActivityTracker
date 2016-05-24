
exports.up = function(knex, Promise) {
 return knex.schema.createTable('posts', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('author_pic');
   t.string('author');
   t.string('title');
   t.string('kids');
   t.text('picture_url');
   t.text('description');
   t.float('hours');
   t.string('time');
   t.timestamp('created_at').defaultTo(knex.fn.now());

 })
};




exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts');
}
