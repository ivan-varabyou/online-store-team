import React from 'react';
import styles from './ProductImages.module.scss';

export const ProductImages = ({
  image,
  index,
  setActiveImage,
}: {
  image: string;
  index: number;
  setActiveImage: (image: number) => void;
}) => {
  return (
    <>
      <div
        className={styles.wrapper}
        onClick={() => setActiveImage(index)}
        key={index}>
        <img src={image} className={styles.image} />
      </div>
    </>
  );
};
