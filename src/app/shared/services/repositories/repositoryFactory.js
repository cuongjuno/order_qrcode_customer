import authRepository from './authRepository';
import divRepository from './divRepository';
import optionRepository from './optionRepository';
import transportCompanyRepository from './transportCompanyRepository';
import userRepository from './userRepository';

export default {
  auth: authRepository,
  users: userRepository,
  'transport-companies': transportCompanyRepository,
  select: optionRepository,
  div: divRepository,
};
