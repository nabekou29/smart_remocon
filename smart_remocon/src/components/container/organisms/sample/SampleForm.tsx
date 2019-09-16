import * as React from 'react';

import { Button, Grid } from '@material-ui/core';
import {
  Field,
  FormSubmitHandler,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import {
  createValidator,
  isEmail,
  isNaturalNumber,
  maxDigits,
  required,
} from '../../../../utils/validation';

import InputField from '../../../presentational/atoms/form/InputField';
import dayjs from 'dayjs';
import { form } from '../../../../constants/form';
import { register } from '../../../../actions/sample';

interface FormData {
  name?: string;
  email?: string;
  birthDate?: string;
  sortOrder?: string;
}

// バリデーション
const validate = createValidator({
  name: [required],
  email: [isEmail],
  birthDate: [required],
  sortOrder: [required, isNaturalNumber, maxDigits(5)],
});

// 初期値
const initialValues = {
  birthDate: dayjs()
    .subtract(20, 'year')
    .format('YYYY-MM-DD'),
};

/** サンプルフォーム */
const SampleForm: React.FC<InjectedFormProps> = ({
  handleSubmit,
  submitting,
  submitSucceeded,
  reset,
  invalid,
}) => {
  // サブミット後にリセット
  React.useEffect(() => {
    if (submitSucceeded) {
      reset();
    }
  }, [submitSucceeded]);

  // サブミット
  const onSubmit: FormSubmitHandler<FormData> = (value, dispatch) => {
    dispatch(
      register.start({
        name: value.name,
        email: value.email,
        birthDate: dayjs(value.birthDate),
        sortOrder: Number(value.sortOrder),
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Field name="name" label="名前" component={InputField}></Field>
        </Grid>
        <Grid item sm={12}>
          <Field name="email" label="Email" component={InputField}></Field>
        </Grid>
        <Grid item sm={12}>
          <Field
            name="birthDate"
            type="date"
            label="生年月日"
            InputLabelProps={{ shrink: true }}
            component={InputField}
          ></Field>
        </Grid>
        <Grid item sm={12}>
          <Field
            name="sortOrder"
            label="並び順"
            type="number"
            inputProps={{ maxLength: 5 }}
            component={InputField}
          ></Field>
        </Grid>
        <Grid item sm={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={invalid || submitting}
          >
            作成
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  validate,
  initialValues,
  form: form.sample,
})(SampleForm);
