import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { Resolvers } from '../types';

const parseDate = (value: unknown): Date => {
  if((typeof value === 'number' && Number.isSafeInteger(value)) || typeof value === 'string') {
    const date = new Date(value)
    if(date.toString() !== 'Invalid Date') {
      return date
    }
  }
  throw new GraphQLError("Invalid Date")
}

const serializeDate = (value: unknown): number => {
  if(value instanceof Date) return value.getTime()
  throw new GraphQLError("Output should be an instance of Date")
}

export const resolvers: Resolvers = {
  Date: new GraphQLScalarType<Date, number>({
    name: 'Date',
    description: 'Date Type',
    serialize: serializeDate,
    parseValue: parseDate,
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      else if(ast.kind === Kind.STRING) {
        return this.parseValue!(ast.value)
      }
      throw new GraphQLError("Invalid Date")
    },
  }),
  DateFuture: new GraphQLScalarType<Date, number>({
    name: 'DateFuture',
    description: 'Future Date Type',
    serialize: serializeDate,
    parseValue(value) {
      const date = parseDate(value)
      if(date.getTime() > Date.now()) return date
      throw new GraphQLError("Date is not in Future");
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      else if(ast.kind === Kind.STRING) {
        return this.parseValue!(ast.value)
      }
      throw new GraphQLError("Invalid Date")
    },
  }),
  DatePast: new GraphQLScalarType<Date, number>({
    name: 'DatePast',
    description: 'Past Date Type',
    serialize: serializeDate,
    parseValue(value) {
      const date = parseDate(value)
      if(date.getTime() < Date.now()) return date
      throw new GraphQLError("Date is not in Past");
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      else if(ast.kind === Kind.STRING) {
        return this.parseValue!(ast.value)
      }
      throw new GraphQLError("Invalid Date")
    },
  })
};