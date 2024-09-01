import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(8,'Password must be at least 8 characters').max(32).required('Required'),
});
export const SignupValidationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  phoneNumber:yup.string('Only number allowed').min(10,'Number must be at least 10').required('Required').nonNullable('Required'),
  username:yup.string().required('Required'),
  password: yup.string().min(8,'Password must be at least 8 characters').max(32).required('Required'),
});
export const CreateBlogValidationSchema = yup.object().shape({
  title:yup.string().required('Required'),
  description:yup.string().min(120,'Minimum characters must be 120').required('Required'),
  postBy:yup.string().notRequired(),
  postDate:yup.string().notRequired(),
  userEmail:yup.string().notRequired(),
});