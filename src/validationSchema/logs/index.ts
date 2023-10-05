import * as yup from 'yup';

export const logValidationSchema = yup.object().shape({
  action: yup.string().required(),
  description: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
