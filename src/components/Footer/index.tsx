import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

console.log(styles);

export const Footer = () => {
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
