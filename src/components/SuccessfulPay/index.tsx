import React from 'react';
import styles from './SuccessfulPay.module.scss';

export function SuccessfulPay() {
  return (
    <div className={styles.block}>
      <div className={styles.textBlock}>
        <div className={styles.text}>
          <p>Спасибо за покупку! <span>	&#128522;</span></p>
          <p>Через 3 секунды вы будете перенаправлены на главную страницу!</p>
        </div>
      </div>
    </div>
  );
}
