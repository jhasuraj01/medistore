import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { Resolvers } from '../types';

const parseString = (value: unknown) => {
  if(typeof value === 'string') {
    return value
  }
  throw new GraphQLError("Input is not Valid String");
}

export const resolvers: Resolvers = {
  StringNonEmpty: new GraphQLScalarType<string, string>({
    name: 'StringNonEmpty',
    description: 'Non Empty String',
    serialize(value) {
      const str: string = parseString(value)
      if(str.trim().length > 0) return str
      throw new GraphQLError("String must not be Empty");
      
    },
    parseValue(value) {
      const str: string = parseString(value)
      if(str.trim().length > 0) return str
      throw new GraphQLError("String must not be Empty");
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.STRING) {
        return this.parseValue!(ast.value)
      }
      throw new GraphQLError("Non Empty String")
    },
  }),
};