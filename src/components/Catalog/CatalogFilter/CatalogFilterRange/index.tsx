import React from 'react';
import { ICatalogFilterRange } from '../../../../models';
import styles from './CatalogFilterRange.module.scss';

export const CatalogFilterRange: React.FC<ICatalogFilterRange> = ({
  data,
  updateInputRange,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data };

    if (e.target.name === 'rangeMin' || e.target.name === 'numberMin') {
      newData.valueMin = +e.target.value;
    }

    if (e.target.name === 'rangeMax' || e.target.name === 'numberMax') {
      newData.valueMax = +e.target.value;
    }

    updateInputRange(newData);
  };

  const valueMin = data.valueMin === -1 ? +data.min : +data.valueMin;

  const valueMax = data.valueMax === -1 ? +data.max : +data.valueMax;

  return (
    <>
      {data && (
        <>
          <article className={styles.range + ' filter-group'}>
            <header className='card-header'>
              <div className='title'>{name}</div>
            </header>
            <div className='card-body'>
              <div className={styles.range__group}>
                <input
                  data-key={data.key}
                  onChange={handleChange}
                  name={`rangeMin`}
                  type='range'
                  className={styles.range__min + ' form-range'}
                  min={data.min}
                  max={data.max}
                  step='1'
                  value={valueMin}
                />
                <input
                  data-key={data.key}
                  onChange={handleChange}
                  name={`rangeMax`}
                  type='range'
                  className={styles.range__max + ' form-range'}
                  min={data.min}
                  max={data.max}
                  step='1'
                  value={valueMax}
                />
              </div>

              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    // ref={numberMin}
                    data-key={data.key}
                    onChange={handleChange}
                    name={`numberMin`}
                    className='form-control'
                    id='min'
                    placeholder={data && data.min ? String(data.min) : '0'}
                    type='number'
                    min='0'
                    max='10000'
                    step='1'
                    value={valueMin}
                  />
                </div>
                <div className='col-6'>
                  <label className='form-label'>Max</label>
                  <input
                    // ref={numberMax}
                    data-key={data.key}
                    onChange={handleChange}
                    name={`numberMax`}
                    className='form-control'
                    id='max'
                    placeholder={data && data.max ? String(data.max) : '0'}
                    type='number'
                    min='0'
                    max='10000'
                    step='1'
                    value={valueMax}
                  />
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
};
