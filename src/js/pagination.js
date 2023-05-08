import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchThemoviedbWeek } from './fetching and rendering/films-of-the-week';
import { fetchThemoviedbSearch } from './fetching and rendering/films-by-search';
const TUI_VISIBLE_PAGES = 5;

const paginationPage = document.querySelector('#pagination');

export function createPagination(totalItems, visiblePages, page) {
  const options = {
    page: page,
    itemsPerPage: 10,
    totalItems: totalItems,
    visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
  };

  const pagination = new Pagination(paginationPage, options);

  pagination.on('beforeMove', function (eventData) {
    return confirm('Go to page ' + eventData.page + '?');
  });

  pagination.on('afterMove', function (eventData) {
    alert('The current page is ' + eventData.page);
  });

  if (visiblePages > 1) {
    paginationPage.style.display = 'block';
  } else {
    paginationPage.style.display = 'none';
  }

  return pagination;
}
