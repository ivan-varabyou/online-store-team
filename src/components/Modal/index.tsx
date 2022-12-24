import React, { useContext } from 'react';

import styles from './Modal.module.scss';

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
  return (
    <>
      {prop.status.modalStatus && (
        <div className={styles.modal + ' modal'} onClick={handleClose}>
          <div className={styles.modal__body}>
            <div className={styles.modal__contacts + ' col-lg-12'}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Contact info</h5>
                  <div className=' col-lg-12'>
                    <label className='form-label'>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='You name'
                      name='name'
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label'>Adress</label>
                    <input
                      type='address'
                      className='form-control'
                      placeholder='You address'
                      name='address'
                    />
                  </div>
                  <div className='col-lg-12'>
                    <label className='form-label'>Phone</label>
                    <input
                      type='phone'
                      value='+375'
                      className='form-control'
                      placeholder=''
                      name='phone'
                    />
                  </div>
                  <div className='col-lg-12'>
                    <label className='form-label'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='you-email@gmail.com'
                      name='email'
                    />
                  </div>
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
                        <label className='form-label'>Name on card</label>
                        <input
                          type='text'
                          className='form-control'
                          name='username'
                          placeholder='Ivan Ivanov'
                        />
                      </div>
                      <div className='col mb-3'>
                        <label className='form-label'>Card number</label>
                        <div className='input-group'>
                          <input
                            type='text'
                            className='form-control'
                            id='cardNumber'
                            name='cardNumber'
                          />
                          <span className={styles.modal__visa}>
                            <svg
                              width='40px'
                              height='40px'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'>
                              <path
                                fill='#FF5F00'
                                d='M15.245 17.831h-6.49V6.168h6.49v11.663z'></path>
                              <path
                                fill='#EB001B'
                                d='M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999
 5.831A7.406 7.406 0 0 1 9.167 12z'></path>
                              <path
                                fill='#F79E1B'
                                d='M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527
 12 6.169A7.417 7.417 0 0 1 24 12z'></path>
                            </svg>
                            <svg
                              width='60px'
                              height='60px'
                              viewBox='0 0 141.732 141.732'
                              xmlns='http://www.w3.org/2000/svg'>
                              <g fill='#ffffff'>
                                <path
                                  d='M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735
 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976
 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493
 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877
 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658
 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439
 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z'></path>
                              </g>
                              <path
                                d='M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373
 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z'
                                fill='#e6a540'></path>
                              <path
                                fill='none'
                                d='M0 0h141.732v141.732H0z'></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className='row mb-4'>
                        <div className='col-auto mb-3'>
                          <label className='form-label'> Expiration </label>
                          <div className='input-group'>
                            <select className='form-select'>
                              <option value='0'>MM</option>
                              <option value='1'>01 - Janiary</option>
                              <option value='2'>02 - February</option>
                              <option value='3'>03 - February</option>
                            </select>
                            <select className='form-select'>
                              <option value='1'>YY</option>
                              <option value='2'>2024</option>
                              <option value='3'>2025</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-3'>
                          <label
                            className='form-label'
                            data-bs-toggle='tooltip'
                            title='3 digits on back side of the card'>
                            CVV <i className='fa fa-question-circle'></i>{' '}
                          </label>
                          <input
                            className='form-control'
                            id='cvv'
                            type='text'
                          />
                        </div>
                      </div>
                      <button className='btn w-100 btn-success'>
                        Pay $10000
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
