const baseApiRoute = 'http://hello-world.innocv.com/api';

const userApiRoute = `${baseApiRoute}/user`;
const userByIdApiRoute = (id: number): string => `${userApiRoute}/${id}`;

export const userEndpoints = {
  userApiRoute,
  userByIdApiRoute
};
