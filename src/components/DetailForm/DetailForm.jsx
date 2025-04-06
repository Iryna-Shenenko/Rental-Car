import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import '../../../src/styles/datepicker-custom.css';

export const DetailForm = () => {
  const [ setStartDate] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    detailDate: null,
    comment: '',
  };

  useEffect(() => {
    const trianglePath = document.querySelector(
      '.react-datepicker__triangle path',
    );
    if (trianglePath) {
      trianglePath.setAttribute('d', 'M0 8 H16 L8 0 8 8'); 
    }
  }, []);

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'The name must be at least 3 characters long!')
    .max(50, 'The name must not exceed 50 characters!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  detailDate: Yup.date() 
    .nullable()
    .required('Booking date is required')
    .min(new Date(), "Date can't be in the past"),
  comment: Yup.string().max(256, 'Comment is too long'),
});

  const handleSubmit = (values, { resetForm }) => {
    toast.success('Successful car reservation!');
    setStartDate(null);
    resetForm();
  };

  return (
    <div >
      <h3 >Book your car now</h3>
      <p >
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form >
            <div>
              <Field name="name"  placeholder="Name*" />
              <ErrorMessage
                name="name"
                component="span"
              />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
              />
            </div>

            <div>
              <DatePicker
                selected={values.detailDate}
                onChange={date => {
                  setFieldValue('detailDate', date);
                  setStartDate(date);
                }}
                placeholderText="Detail date"
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
              />
              <ErrorMessage
                name="detailDate"
                component="span"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}

            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};