import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { Resolvers } from '../types';

const parseNumber = (value: unknown): number => {
  if(typeof value === 'number') {
    return value
  }
  throw new GraphQLError("Invalid Number")
}

const serializeNumber = (value: unknown): number => {
  if(typeof value === 'number') return value
  throw new GraphQLError("Output should be Valid Number")
}

const parseInt = (value: number): number => {
  if(Number.isSafeInteger(value)) return value
  throw new GraphQLError("Number is not Integer")
}

export const resolvers: Resolvers = {
  IntPositive: new GraphQLScalarType<number, number>({
    name: 'IntPositive',
    description: 'Positive Integer',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      const integer: number = parseInt(number)
      if(integer > 0) return integer
      throw new GraphQLError("Integer Must be Positive")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Positive Integer")
    },
  }),
  IntNonNegative: new GraphQLScalarType<number, number>({
    name: 'IntNonNegative',
    description: 'Non Negative Integer',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      const integer: number = parseInt(number)
      if(integer >= 0) return integer
      throw new GraphQLError("Integer Must be Non Negative")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Negative Integer")
    },
  }),
  IntNegative: new GraphQLScalarType<number, number>({
    name: 'IntNegative',
    description: 'Negative Integer',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      const integer: number = parseInt(number)
      if(integer < 0) return integer
      throw new GraphQLError("Integer Must be Negative")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Negative Integer")
    },
  }),
  IntNonPositive: new GraphQLScalarType<number, number>({
    name: 'IntNonPositive',
    description: 'Non Positive Integer',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      const integer: number = parseInt(number)
      if(integer <= 0) return integer
      throw new GraphQLError("Integer Must be Non Positive")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Positive Integer")
    },
  }),
  IntNonZero: new GraphQLScalarType<number, number>({
    name: 'IntNonZero',
    description: 'Non Positive Integer',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      const integer: number = parseInt(number)
      if(integer !== 0) return integer
      throw new GraphQLError("Integer Must be Non Zero")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Positive Integer")
    },
  }),
  FloatPositive: new GraphQLScalarType<number, number>({
    name: 'FloatPositive',
    description: 'Positive Float',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(number > 0) return number
      throw new GraphQLError("Number Must be Positive")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Positive Number")
    },
  }),
  FloatNonNegative: new GraphQLScalarType<number, number>({
    name: 'FloatNonNegative',
    description: 'Non Negative Float',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(number >= 0) return number
      throw new GraphQLError("Number Must be Non Negative Float")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Negative Float")
    },
  }),
  FloatNegative: new GraphQLScalarType<number, number>({
    name: 'FloatNegative',
    description: 'Negative Float',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(number < 0) return number
      throw new GraphQLError("Number Must be Negative Float")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Negative Float")
    },
  }),
  FloatNonPositive: new GraphQLScalarType<number, number>({
    name: 'FloatNonPositive',
    description: 'Non Positive Float',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(number <= 0) return number
      throw new GraphQLError("Number Must be Non Positive Float")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Positive Float")
    },
  }),
  FloatNonZero: new GraphQLScalarType<number, number>({
    name: 'FloatNonZero',
    description: 'Non Zero Float',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(number !== 0) return number
      throw new GraphQLError("Number Must be Non Zero Float")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Non Zero Float")
    },
  }),
  Float0To1: new GraphQLScalarType<number, number>({
    name: 'Float0To1',
    description: '0 to 1 numbers inclusive',
    serialize: serializeNumber,
    parseValue(value) {
      const number: number = parseNumber(value)
      if(0 <= number && number <= 1) return number
      throw new GraphQLError("Number Must be From 0 to 1 inclusive")
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return this.parseValue!(Number(ast.value))
      }
      throw new GraphQLError("Expected Number From 0 to 1 inclusive")
    },
  }),
};