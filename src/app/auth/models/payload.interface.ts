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
