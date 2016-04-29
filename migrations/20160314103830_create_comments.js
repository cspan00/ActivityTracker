
exports.up = function(knex, Promise) {
 return knex.schema.createTable('comments', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('post_id');
   t.text('comment');
   t.timestamps();
 })
};




exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('comments');
}
