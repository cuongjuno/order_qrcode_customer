import MESSAGES from '~constant/messages';

const formResetPwdRules = {
  email: [
    {
      required: true,
      message: MESSAGES[99],
    },
    {
      type: 'email',
      message: MESSAGES[3],
    },
  ],
};

export default formResetPwdRules;
