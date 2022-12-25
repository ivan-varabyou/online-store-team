import React from 'react';

import { ICatalogDisplayProps } from '../../../models';

import styles from './CatalogDisplay.module.scss';

export const CatalogDisplay = ({
  catalogProductDisplay,
  setCatalogProductDisplay,
}: ICatalogDisplayProps): JSX.Element => {
  const catalogProductDisplayList =
    catalogProductDisplay === 'list' && 'active';
  const catalogProductDisplayGrid =
    catalogProductDisplay === 'grid' && 'active';

  return (
    <>
      <div className={`${styles.display} btn-group`}>
        <span
          onClick={() => setCatalogProductDisplay('list')}
          className={catalogProductDisplayList + ' btn btn-light'}>
          <i className='bi bi-list'></i>
        </span>
        <span
          onClick={() => setCatalogProductDisplay('grid')}
          className={catalogProductDisplayGrid + ' btn btn-light'}>
          <i className='bi bi-grid-3x3-gap-fill'></i>
        </span>
      </div>
    </>
  );
};
