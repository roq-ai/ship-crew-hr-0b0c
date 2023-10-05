import * as yup from 'yup';

export const crewMemberValidationSchema = yup.object().shape({
  position: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  ship_id: yup.string().nullable().required(),
});
