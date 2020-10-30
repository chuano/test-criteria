export class Filter {
  readonly field: string
  readonly value: string | boolean | number | undefined = undefined
  readonly operator: '<' | '>' | '<=' | '>=' | '=' | 'ilike' = '='

  constructor(
    field: string,
    operator: '<' | '>' | '<=' | '>=' | '=' | 'like' = '=',
    value: string | boolean | number | undefined = undefined,
  ) {
    this.field = field
    this.value = operator === 'like' ? `%${value}%` : value
    this.operator = operator === 'like' ? 'ilike' : operator
  }
}