import React, {
  useState,
  useEffect,
  EventHandler,
  FormEvent,
  useContext,
  useRef,
} from 'react';
import qs from 'qs';

import copy from 'copy-to-clipboard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCatalogProducts } from '../hooks/products';
import { IResultProduct } from '../models';
import { ProductCardGrid } from '../components/ProductCardGrid';
import { ScaletonCatalog } from '../components/ScaletonCatalog/';
import { ErrorMessage } from '../components/ErrorMessage/';
import { CatalogFilter } from '../components/CatalogFilter/';
import { SearchContext } from '../App';

import styles from '../scss/page/CategoryPage.module.scss';

export function CatalogPage() {
  const searchValueContext = useContext(SearchContext).searchValue;
  const setSearchValueContext = useContext(SearchContext).setSerachValue;

  const navigate = useNavigate();

  /* --------GET QUERY URL ----------*/

  const [search, setSearch] = useSearchParams();

  const defaultSelect = search.get('sort')
    ? String(search.get('sort'))
    : 'default';

  const [selected, setSelected] = useState(defaultSelect);

  let searchValue: string;
  if (search.get('search')) {
    searchValue = String(search.get('search'));
  } else {
    searchValue = String(searchValueContext);
  }

  /* --------FETCH ----------*/

  const { result, error, loading, setResult } = getCatalogProducts(
    String(searchValue),
    String(selected),
  );

  /* --------SET QUERY URL ----------*/
  useEffect(() => {
    type TypeQuery = {
      sort?: string;
      search?: string;
    };
    const query: TypeQuery = {};
    if (searchValue !== undefined && searchValue.length > 0)
      query.search = searchValue;
    if (searchValueContext !== undefined && searchValueContext.length > 0)
      query.search = searchValueContext;
    if (selected !== 'default') query.sort = selected;
    const queryString = qs.stringify(query);
    navigate(`?${queryString}`);
  }, [selected, searchValueContext]);

  /* --------selected----------*/
  type ISelectList = { value: string; text: string };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.target.value);
  };
  const selectList: ISelectList[] = [
    { value: 'default', text: 'Sort default' },
    { value: 'price-ASC', text: 'Sort by price ASC' },
    { value: 'price-DESC', text: 'Sort by price DESC' },
    { value: 'rating-ASC', text: 'Sort by rating ASC' },
    { value: 'rating-DESC', text: 'Sort by rating DESC' },
    { value: 'discount-ASC', text: 'Sort by discount ASC' },
    { value: 'discount-DESC', text: 'Sort by discount DESC' },
  ];

  /* ------GRID---------- */

  const [cardGrid, setCardGrid] = useState('grid');
  const listActive = cardGrid === 'list' && 'active';
  const gridActive = cardGrid === 'grid' && 'active';

  /* ---------filterParametr---------*/

  const filterParametr = {
    category: [
      { name: 'category name', status: false },
      { name: 'category name2', status: true },
    ],
    brand: [
      { name: 'brand name', status: false },
      { name: 'brand name2', status: true },
    ],
    price: {
      min: 0,
      max: 100,
      value: 50,
    },
    stock: {
      min: 0,
      max: 100,
      value: 50,
    },
  };

  const [filterData, setfilterData] = useState(filterParametr);

  /*---RESET BUTTON----*/
  const hendleResetUrl = () => {
    navigate('/');
    setSelected('default');
    if (setSearchValueContext) setSearchValueContext('');
  };

  const hendleCopyUrl = () => {
    copy(window.location.href);
  };

  return (
    <>
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Category name</h1>
            <p className={styles.products__items}>
              {result.length} Items found
            </p>
          </div>
        </section>
        <div className='container'>
          <div className={styles.products}>
            <div className='row'>
              <aside className='col-lg-3'>
                <div className='btn-group col-12'>
                  <button
                    className='btn btn-light btn-icon'
                    onClick={hendleCopyUrl}>
                    Copy
                  </button>

                  <button
                    onClick={hendleResetUrl}
                    className='btn btn-light btn-icon'>
                    Reset
                  </button>
                </div>
                <CatalogFilter
                  data={filterData}

                  // onChangeFilter={setfilterData}
                />
              </aside>
              <div className='col-lg-9'>
                <div className='row'>
                  <div className={styles.products__options}>
                    <select
                      value={selected}
                      onChange={handleChange}
                      className='form-select d-inline-block w-auto'
                      id='optionSort'>
                      {selectList.map((opt: ISelectList, id: number) => (
                        <option value={opt?.value} key={id}>
                          {opt?.text}
                        </option>
                      ))}
                    </select>

                    <div className='btn-group'>
                      <span
                        onClick={() => setCardGrid('list')}
                        className={listActive + ' btn btn-light'}>
                        <i className='bi bi-list'></i>
                      </span>
                      <span
                        onClick={() => setCardGrid('grid')}
                        className={gridActive + ' btn btn-light'}>
                        <i className='bi bi-grid-3x3-gap-fill'></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={'product-' + cardGrid}>
                  {loading && <ScaletonCatalog />}
                  {error && <ErrorMessage error={error} />}
                  {!loading &&
                    result.map((product) => (
                      <ProductCardGrid product={product} key={product.id} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
