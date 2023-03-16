export interface UserPayload {
  resource_access: ResourceAccess;
  name: string;
  preferred_username: string;
  email: string;
}

type ResourceAccess = {
  pgm_manager: PgmManager;
};

type PgmManager = {
  roles: string[];
};

// export const PUBLIC_KEY =
//   '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt3p6Y4epRUSWsLMpS9esdtvCelMJx3MnHUMIAFgB4vB+oU3Eb1uDDlRuTMYhzOb2abQJSfYQUdQCo1qBwZMqvxkJ3ws+N89uPjGLGaPVuH8cTlFXWH/r1f+6bfol1NcpPoS0Bd7hsbcJWDUxLQ+5L6ZKFutTTOIy/T2YNkYr/sJ23PPYge2gYk4kKkFEhqQjK7yZQgy8dedmHvexNBZSWrYgBexy3LMhaLzyqI9okecrO0It0Y/I2RDskAzVUWujB/ElDzoomlipEb/M5kfrUpDwJcuaqh629zNqpZPSeR/8VE7T/8ZLeRGH2sWcaqkJWcqAawBKqrSwBHgRLfR5UQIDAQAB\n-----END PUBLIC KEY-----';
