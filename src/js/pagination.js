import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchThemoviedbWeek } from './fetching and rendering/films-of-the-week';

const TUI_VISIBLE_PAGES = 5;

const paginationPage = document.querySelector('#pagination');

export function createPagination(totalItems, visiblePages) {
  const options = {
    page: 1,
    itemsPerPage: 20,
    totalItems: totalItems,
    visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
  };

  const pagination = new Pagination(paginationPage, options);

  if (visiblePages > 1) {
    paginationPage.style.display = 'block';
  } else {
    paginationPage.style.display = 'none';
  }

  return pagination;
}
