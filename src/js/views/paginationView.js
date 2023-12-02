import icons from 'url:../../img/icons.svg';
import View from './view.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //the render function needs a generateMarkup method
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    // console.log(numPages);
    //scenarios
    //1.on page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto ="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //2.on page 1 and no other pages
    if (curPage === 1 && numPages === 1) {
      return ``;
    }

    //3.on last page
    if (curPage === numPages) {
      return `<button data-goto ="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span> Page ${curPage - 1}</span>
    </button>`;
    }

    //4.on another page
    if (curPage < numPages && curPage > 1) {
      return `<button  data-goto ="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto ="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      // console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
}

export default new paginationView();
