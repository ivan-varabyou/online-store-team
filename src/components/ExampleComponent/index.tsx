import React from 'react';

import styles from './ExampleComponent.module.scss';

const ExampleComponent = () => {
  return (
    <>
      <header>
        <div className='container'>
          <h1 className='{styles.test}'>Header</h1>
        </div>
      </header>
    </>
  );
};
