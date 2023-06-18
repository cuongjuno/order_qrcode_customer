import dayjs from 'dayjs';

import { DATE_DISPLAY } from '~constant/date';

const formatDate = (value, formatType = DATE_DISPLAY) => {
  const dateObj = dayjs(value).isValid() ? dayjs(value) : value;

  return dateObj.format(formatType);
};

export default { formatDate };
