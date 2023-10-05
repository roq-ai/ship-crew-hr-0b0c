import * as yup from 'yup';

export const scheduleValidationSchema = yup.object().shape({
  departure_date: yup.date().required(),
  arrival_date: yup.date().required(),
  departure_location: yup.string().required(),
  arrival_location: yup.string().required(),
  ship_id: yup.string().nullable().required(),
});
