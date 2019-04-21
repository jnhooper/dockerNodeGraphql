import { merge } from 'lodash';
import userResolvers from '../resolvers/user';
import messageResolvers from '../resolvers/message';

const result = merge(
  userResolvers,
  messageResolvers
);

console.log(result);
export default result;
