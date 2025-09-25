/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { FormProvider, SubmitErrorHandler, useForm } from "react-hook-form";

interface FormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends FormConfig {
  children: ReactNode;
  onSubmit: SubmitErrorHandler<any>;
}

export const FormWrapper = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: FormConfig = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
