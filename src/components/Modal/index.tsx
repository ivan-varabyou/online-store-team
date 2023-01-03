import React from 'react';
import { useCreditCardValidator, images } from 'react-creditcard-validator';
import { useForm } from 'react-hook-form';

import styles from './Modal.module.scss';

type UserSubmitForm = {
  fullname: string;
  phonenumber: string;
  email: string;
  address: string;

  acceptTerms: boolean;
};

export function Modal(prop: {
  status: {
    modalStatus: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.classList.contains('modal')) prop.status.setModalStatus(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>();

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  function expDateValidate(month: string, year: string) {
    if (Number(year) > 2030) {
      return 'Expiry Date Year cannot be greater than 2030';
    }
    return;
  }

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

  return (
    <>
      {prop.status.modalStatus && (
        <div className={styles.modal + ' modal'} onClick={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modal__body}>
              <div className={styles.modal__contacts + ' col-lg-12'}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Contact info</h5>
                    <div className=' col-lg-12'>
                      <label className='form-label'>Full Name</label>
                      <input
                        className='form-control'
                        placeholder='Albert Enstein'
                        {...register('fullname', {
                          required: true,
                          minLength: 3,
                          pattern:
                            /(^[A-Z]{1}[a-z]{2,14} [A-Z]{1}[a-z]{2,14}$)|(^[А-Я]{1}[а-я]{2,14} [А-Я]{1}[а-я]{2,14}$)/,
                        })}
                      />
                      {errors?.fullname?.type === 'required' && (
                        <p style={{ color: 'red' }}>This field is required</p>
                      )}
                      {errors?.fullname?.type === 'minLength' && (
                        <p style={{ color: 'red' }}>
                          Full Name cannot exceed 3 characters
                        </p>
                      )}
                      {errors?.fullname?.type === 'pattern' && (
                        <p style={{ color: 'red' }}>Invalid data</p>
                      )}
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>Address</label>
                      <input
                        className='form-control'
                        placeholder='Your address'
                        {...register('address', {
                          required: true,
                          minLength: 3,
                          pattern:
                          /(^[^\s]{5,30} [^\s]{5,30} [^\s]{5,30})/,
                        })}
                      />
                      {errors?.address?.type === 'required' && (
                        <p style={{ color: 'red' }}>This field is required</p>
                      )}
                      {errors?.address?.type === 'minLength' && (
                        <p style={{ color: 'red' }}>
                          Address cannot exceed 3 characters
                        </p>
                      )}
                      {errors?.address?.type === 'pattern' && (
                        <p style={{ color: 'red' }}>Invalid data</p>
                      )}
                    </div>
                    <div className='col-lg-12'>
                      <label className='form-label'>Phone</label>
                      <input
                        className='form-control'
                        placeholder='+375xxxxxxxxx'
                        {...register('phonenumber', {
                          required: true,
                          pattern:
                            /^\+(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
                        })}
                      />
                      {errors?.phonenumber?.type === 'required' && (
                        <p style={{ color: 'red' }}>This field is required</p>
                      )}
                      {errors?.phonenumber?.type === 'pattern' && (
                        <p style={{ color: 'red' }}>Incorrect phone number</p>
                      )}
                    </div>
                    <label className='form-label'>Email</label>
                    <input
                      className='form-control'
                      placeholder='example@gmail.com'
                      {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                      })}
                    />
                    {errors?.email?.type === 'required' && (
                      <p style={{ color: 'red' }}>This field is required</p>
                    )}
                    {errors?.email?.type === 'pattern' && (
                      <p style={{ color: 'red' }}>Incorrect email</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className={styles.modal__payments + ' col-lg-12'}>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>Payment form</h5>
                      <form role='form'>
                        <div className='col mb-3'>
                          <div className={styles.input__group}>
                            <svg {...getCardImageProps({ images })} />
                            <label>Card Number</label>
                            <input {...getCardNumberProps()} />
                          </div>
                        </div>
                        <div className='row mb-4'>
                          <div className='col-auto mb-3'>
                            <label className='form-label'> Expiration </label>
                            <div className={styles.multi__input}>
                              <div className={styles.input__group}>
                                <label>Valid Till</label>
                                <input {...getExpiryDateProps()} />
                                <small>
                                  {erroredInputs.expiryDate &&
                                    erroredInputs.expiryDate}
                                </small>
                              </div>

                              <div className={styles.input__group}>
                                <label>CVC</label>
                                <input {...getCVCProps()} />
                                <small>
                                  {erroredInputs.cvc && erroredInputs.cvc}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <button className='btn w-100 btn-success' onClick={() => {alert("Redirect...")}}>Pay</button>
            </div>
            
          </form>
        </div>
      )}
    </>
  );
}
