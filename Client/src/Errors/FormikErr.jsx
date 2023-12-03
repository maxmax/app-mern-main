const FormikErr = ({ touched, errors }) => {
  return (
    <>
      <small>{touched && errors}</small>
    </>
  );
};

export default FormikErr;
