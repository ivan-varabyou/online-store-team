export default function redirectingNonExistentPages(
  searchUrl: URLSearchParams,
) {
  const patch = window.location.pathname;
  const search = window.location.search;
  if (
    patch === '/cart' &&
    search !== '' &&
    !(searchUrl.get('modal') === 'buy') &&
    !searchUrl.get('page')
  )
    window.location.href = '/404';

  if (patch === '/') {
    if (
      !(
        search === '' ||
        String(searchUrl.get('search'))?.length > 0 ||
        searchUrl.get('grid') === 'list' ||
        searchUrl.get('sort') === 'price-ASC' ||
        searchUrl.get('sort') === 'price-DESC' ||
        searchUrl.get('sort') === 'rating-ASC' ||
        searchUrl.get('sort') === 'rating-DESC' ||
        searchUrl.get('sort') === 'discount-ASC' ||
        searchUrl.get('sort') === 'discount-DESC'
      )
    ) {
      window.location.href = '/404';
    }
  }

  if (patch.includes('/product') && search !== '')
    window.location.href = '/404';
}
