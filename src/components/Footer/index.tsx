import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  React.useState();
  return (
    <>
      <footer className={styles.footer}>
        <div className='container'>
          <section className={styles.footer__section}>
            <div className='row'>
              <aside className='col-12 col-sm-12 col-lg-5'>
                <article className='me-lg-4'>
                  <Link className={styles.footer__logo} to='/'>
                    <i className='bi bi-lightning-charge-fill'></i> RSSHOP
                  </Link>
                  <p className='mt-3'>© 2022 All rights reserved</p>
                  <div className={styles.footer__payments}>
                    <svg
                      width='40px'
                      height='40px'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                      <path
                        fill='#FF5F00'
                        d='M15.245 17.831h-6.49V6.168h6.49v11.663z'
                      />
                      <path
                        fill='#EB001B'
                        d='M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999
                        5.831A7.406 7.406 0 0 1 9.167 12z'
                      />
                      <path
                        fill='#F79E1B'
                        d='M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527
                        12 6.169A7.417 7.417 0 0 1 24 12z'
                      />
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
                          16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z'
                        />
                      </g>
                      <path
                        d='M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373
                        1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z'
                        fill='#e6a540'
                      />
                      <path fill='none' d='M0 0h141.732v141.732H0z' />
                    </svg>
                  </div>
                </article>
              </aside>
              <aside className='col-12 col-sm-2  col-lg-3'>
                <h6 className={styles.footer__title}>Shop</h6>
                <ul className={styles.footer__ul}>
                  <li>
                    <Link to='/'>Catalog</Link>
                  </li>
                  <li>
                    <Link to='/cart'>Cart</Link>
                  </li>
                  <li>
                    <Link to='/404'>404</Link>
                  </li>
                </ul>
              </aside>
              <aside className='col-12 col-sm-2  col-lg-3'>
                <h6 className={styles.footer__title}>Github</h6>
                <ul className={styles.footer__ul}>
                  <li>
                    <a
                      href='https://github.com/ivan-varabyou/'
                      className='footer__github'>
                      @ivan-varabyou
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://github.com/earn1ll/'
                      className='footer__github'>
                      @earn1ll
                    </a>
                  </li>
                </ul>
              </aside>
              <aside className='col-12 col-sm-2 col-lg-1'>
                <a href='https://rs.school/js/'>
                  <img
                    src={'https://rs.school/images/rs_school_js.svg'}
                    alt='RS SCHOOL'
                    className={styles.footer__rs}
                  />
                </a>
              </aside>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
};
