import React from 'react';

import styles from './ErrorMessage.module.scss';

interface IErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: IErrorMessageProps) {
  React.useState();
  return <p className={styles.message}>{error}</p>;
}
