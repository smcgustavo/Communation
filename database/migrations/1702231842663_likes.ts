import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('userId').alter();
      table.integer('postId').alter();
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('userId').alter();
      table.string('postId').alter();
    })
  }
}
