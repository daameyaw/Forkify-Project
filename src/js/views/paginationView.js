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
    console.log(numPages);
    //scenarios
    //1.on page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return `other Pages`;
    }
    //2.on page 1 and no other pages
    if (curPage === 1 && numPages === 1) {
    }

    //3.on last page
    if (curPage === numPages) {
    }

    //4.on another page
    if (curPage < numPages && curPage > 1) {
    }
  }
}

export default new paginationView();
