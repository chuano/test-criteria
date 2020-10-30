import Knex from 'knex';
import { Filter } from './Filter';

export class QueryGenerator {
  private readonly db: Knex
  private readonly fields: string[]
  private readonly table: string
  private readonly filters: Filter[]

  constructor(db: Knex, table: string, fields: string[] = []) {
    this.db = db
    this.table = table
    this.fields = fields
    this.filters = []
  }

  public addFilter(filter: Filter): void {
    this.filters.push(filter)
  }

  public async getResult(limit?: number, page?: number) {
    const queryBuilder = this.db(this.table)

    if (this.fields.length > 0) {
      queryBuilder.select(this.fields)
    }

    for (const filter of this.filters) {
      if (filter.value !== undefined) {
        queryBuilder.andWhere(filter.field, filter.operator, filter.value)
      }
    }

    if (limit) {
      page = page ?? 1
      queryBuilder.limit(limit).offset((page - 1) * limit)
    }

    return await queryBuilder
  }
}