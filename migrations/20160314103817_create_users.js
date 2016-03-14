
exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(t){
   t.string('facebook_id').unique();
   t.text('profile_image_url');
   t.string('email');
   t.string('first_name');
   t.string('last_name');
   t.string('name');
   t.timestamps();
   t.string('bio');
   t.boolean('is_admin');
 })
};




exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('users');
}
