
exports.up = function(knex, Promise) {
 return knex.schema.createTable('posts', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('author_pic');
   t.string('author');
   t.string('title');
   t.string('kid_1');
   t.string('kid_2');
   t.string('kid_3');
   t.string('kid_4');
   t.text('picture_url');
   t.text('description');
   t.float('hours');
   t.string('time');

 })
};




exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts');
}
