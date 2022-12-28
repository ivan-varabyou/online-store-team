import React, { useEffect, useRef, useState } from 'react';
import { ICatalogFilterRange, TypeFilterRange } from '../../../../models';
import styles from './CatalogFilterRange.module.scss';

export const CatalogFilterRange: React.FC<ICatalogFilterRange> = ({
  data,
  updateInputRange,
  name,
}) => {
  const rangeMin = useRef<HTMLInputElement>(null);
  const rangeMax = useRef<HTMLInputElement>(null);
  const numberMin = useRef<HTMLInputElement>(null);
  const numberMax = useRef<HTMLInputElement>(null);

  const rangeMinCurrent = rangeMin.current;
  const rangeMaxCurrent = rangeMax.current;
  const numberMinCurrent = numberMin.current;
  const numberMaxCurrent = numberMax.current;

  const [dataRange, setDataRange] = useState(data);

  useEffect(() => {
    setDataRange(data);
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dataCopy: TypeFilterRange = JSON.parse(JSON.stringify(dataRange));
    const attrName = event.target.getAttribute('name');
    const value = event.target.value;

    attrName && updateInputValue(value, attrName);

    if (dataCopy && dataCopy.valueMin && numberMinCurrent)
      dataCopy.valueMin = Number(numberMinCurrent.value);
    if (dataCopy && dataCopy.valueMax && numberMaxCurrent)
      dataCopy.valueMax = Number(numberMaxCurrent.value);

    setDataRange(dataCopy);
    data?.key && updateInputRange(dataRange, data.key);
  };

  function updateInputValue(value: string, attrName: string | null) {
    if (isChange()) {
      if (attrName === 'rangeMin' && numberMinCurrent)
        numberMinCurrent.value = value;
      if (attrName === 'rangeMax' && numberMaxCurrent)
        numberMaxCurrent.value = value;
      if (attrName === 'numberMin' && rangeMinCurrent)
        rangeMinCurrent.value = value;
      if (attrName === 'numberMax' && rangeMaxCurrent)
        rangeMaxCurrent.value = value;
    }
  }

  function isChange() {
    if (rangeMinCurrent && rangeMaxCurrent)
      return Number(rangeMinCurrent.value) < Number(rangeMaxCurrent.value);
  }

  const getValueMin = () =>
    dataRange.valueMin === -1
      ? +dataRange.min.toString()
      : +dataRange.valueMin.toString();

  const getValueMax = () =>
    dataRange.valueMax === -1
      ? +dataRange.max.toString()
      : +dataRange.valueMax.toString();

  return (
    <>
      {data && (
        <>
          <article className={styles.range + ' filter-group'}>
            <header className='card-header'>
              <div className='title'>{name}</div>
            </header>
            <div className='card-body'>
              <input
                ref={rangeMin}
                data-key={dataRange.key}
                onChange={handleChange}
                name={`rangeMin`}
                type='range'
                className='form-range'
                min={dataRange.min}
                max={dataRange.max}
                step='1'
                value={getValueMin()}
              />

              <input
                ref={rangeMax}
                data-key={dataRange.key}
                onChange={handleChange}
                name={`rangeMax`}
                type='range'
                className='form-range'
                min={dataRange.min}
                max={dataRange.max}
                step='1'
                value={getValueMax()}
              />
              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    ref={numberMin}
                    data-key={dataRange.key}
                    onChange={handleChange}
                    name={`numberMin`}
                    className='form-control'
                    id='min'
                    placeholder={
                      dataRange && dataRange.min ? String(dataRange.min) : '0'
                    }
                    type='number'
                    min={dataRange.min}
                    max={dataRange.max}
                    step='1'
                    value={getValueMin()}
                  />
                </div>
                <div className='col-6'>
                  <label className='form-label'>Max</label>
                  <input
                    ref={numberMax}
                    data-key={dataRange.key}
                    onChange={handleChange}
                    name={`numberMax`}
                    className='form-control'
                    id='max'
                    placeholder={
                      dataRange && dataRange.max ? String(dataRange.max) : '0'
                    }
                    type='number'
                    min={dataRange.min}
                    max={dataRange.max}
                    step='1'
                    value={getValueMax()}
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
