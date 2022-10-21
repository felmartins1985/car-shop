export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  EmptyObject = 'EmptyObject',
}
type ErrorResponseObject = {
  message: string;
  httpStatus: number
};
export type ErrorCatalog = {
  // onde cada chave desse objeto é uma chave do Enum ErrorTypes
  // e cada valor é um objeto de resposta da API
  [key in ErrorTypes]: ErrorResponseObject
};
export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  EmptyObject: {
    message: 'EmptyObject',
    httpStatus: 400,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};
