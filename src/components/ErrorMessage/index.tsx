import React from 'react';

import styles from './ErrorMessage.module.scss';

interface IErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: IErrorMessageProps) {
  return <p className={styles.message}>{error}</p>;
}
