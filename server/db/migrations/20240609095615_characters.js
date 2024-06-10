/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('characters', (table) => {
    table.integer('id').primary()
    table.string('manager_id')
    table.string('name')
    table.text('bio')
    table.integer('evil_points')
    table.integer('good_points')
    table.text('img_url')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('characters')
}
