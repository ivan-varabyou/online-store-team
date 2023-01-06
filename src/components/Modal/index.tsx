import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setLocalStorage } from '../../utils/localStorage';
import { SuccessfulPay } from '../SuccessfulPay';

import styles from './Modal.module.scss';

type UserSubmitForm = {
  fullname: string;
  phonenumber: string;
  email: string;
  address: string;
  cardnumber: number;
  carddate: number;
  cvv: number;
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

  const [isSuccess, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>();

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(isSuccess);
    setSuccess(true);
    
    setTimeout(() => {
      setLocalStorage('cart', []);
      window.location.href = '/';
    }, 3000);
  };

  const [value, setValue] = useState('');
  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val =
      e.target.value
        .replace(/\s|[^0-9]+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') ?? '';

    setValue(val);
  };

  const [cardDate, setcardDate] = useState('');
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val =
      e.target.value
        .replace(/\s|[^0-9]+/g, '')
        .match(/.{1,2}/g)
        ?.join('/') ?? '';

    setcardDate(val);
  };

  if (isSuccess) {
    return (
      <div>
        <SuccessfulPay />
      </div>
    );
  } else {
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
                            pattern: /(^[^\s]{5,30} [^\s]{5,30} [^\s]{5,30})/,
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
                        <div className='col-12'>
                          <label className='form-label'>Card Number</label>
                          <input
                            value={value}
                            maxLength={19}
                            type='tel'
                            inputMode='numeric'
                            className='form-control'
                            placeholder='xxxx xxxx xxxx xxxx'
                            {...register('cardnumber', {
                              required: true,
                              minLength: 19,
                            })}
                            onChange={handleChangeCard}
                          />
                          {errors?.cardnumber?.type === 'required' && (
                            <p style={{ color: 'red' }}>
                              This field is required
                            </p>
                          )}
                          {errors?.cardnumber?.type === 'minLength' && (
                            <p style={{ color: 'red' }}>
                              Incorrect card number
                            </p>
                          )}
                        </div>
                        <div className='col-12'>
                          <label className='form-label'>Valid date</label>
                          <input
                            value={cardDate}
                            maxLength={5}
                            type='tel'
                            inputMode='numeric'
                            className='form-control'
                            placeholder='01/23'
                            {...register('carddate', {
                              required: true,
                              minLength: 5,
                              pattern: /(0[1-9]|1[0-2])\/(2[3-9]|3[0-9])/,
                            })}
                            onChange={handleChangeDate}
                          />
                          {errors?.carddate?.type === 'required' && (
                            <p style={{ color: 'red' }}>
                              This field is required
                            </p>
                          )}
                          {errors?.carddate?.type === 'minLength' && (
                            <p style={{ color: 'red' }}>Incorrect date</p>
                          )}
                          {errors?.carddate?.type === 'pattern' && (
                            <p style={{ color: 'red' }}>Incorrect date</p>
                          )}
                        </div>
                        <div className='col-12'>
                          <label className='form-label'>CVV</label>
                          <input
                            maxLength={3}
                            type='tel'
                            inputMode='numeric'
                            className='form-control'
                            placeholder='123'
                            {...register('cvv', {
                              required: true,
                              minLength: 3,
                            })}
                          />
                          {errors?.cvv?.type === 'required' && (
                            <p style={{ color: 'red' }}>
                              This field is required
                            </p>
                          )}
                          {errors?.cvv?.type === 'minLength' && (
                            <p style={{ color: 'red' }}>Incorrect CVV</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type='submit' className='btn w-100 btn-success'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}
