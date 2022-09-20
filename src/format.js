import dayjs from 'dayjs';

export const formatDate = (date, format) => dayjs(date).format(format);

// TODO: удалить
export const getIconUrl = (name) => `img/icons/${name}.png`;

export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
