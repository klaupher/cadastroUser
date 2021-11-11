exports.up = function (knex) {
    return knex.schema.createTable("users", (tbl) => {
        tbl.increments();  //id field
        tbl.string("name").notNullable();
        tbl.string("email").notNullable().unique();
        tbl.string("password").notNullable();
        tbl.integer("role").notNullable().unsigned();
        tbl.timestamps(false, false);
    }).createTable("pwdTakens", (tbl) => {
        tbl.increments();
        tbl.string("token", 200).notNullable();
        tbl.timestamps(true, true);
        
        // Foreign Key to 'Users' table
        tbl.integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('pwdTakens');
};
