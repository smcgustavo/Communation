import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('content').notNullable()
      table.string('author').notNullable()
      table.integer('likes')
      table.integer('dislikes')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('content')
      table.dropColumn('author')
      table.dropColumn('likes')
      table.dropColumn('dislikes')
    })
  }
}
