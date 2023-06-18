import dayjs from 'dayjs';

const disabledDateBefore = (current) => dayjs().add(-1, 'days') >= current;
export default disabledDateBefore;
