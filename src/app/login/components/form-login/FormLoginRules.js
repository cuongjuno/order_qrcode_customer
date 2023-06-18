import MESSAGES from '~constant/messages';

const formLoginRules = {
  loginId: [
    {
      required: true,
      message: MESSAGES[1],
    },
  ],
  password: [
    {
      required: true,
      message: MESSAGES[1],
    },
  ],
};

export default formLoginRules;
