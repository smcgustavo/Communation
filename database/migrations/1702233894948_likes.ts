import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('postId')
      table.dropColumn('userId')
      table.integer('user_Id').notNullable()
      table.integer('post_Id').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_Id')
      table.dropColumn('post_Id')
      table.integer('postId').notNullable()
      table.integer('userId').notNullable()
    })
  }
}
