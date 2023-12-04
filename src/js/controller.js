import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    //gettting the id from the url
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1Loading recipe

    await model.loadRecipe(id);
    console.log(model.state);
    // const { recipe } = model.state;

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    // console.error(error.message);
  }
};
// controlRecipe();
//where everything starts
//    ['hashchange', 'load'].forEach(function (event) {
//  window.addEventListener(event, handler);

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1. GET THE QUERY FOR THE SEARCH FORM
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);

    //2USING THE QUERY,FETCH THE DATA FROM THE API
    await model.loadSearchResults(query);
    // console.log(model.state.search.result);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();
//
const controlPagination = function (goToPage) {
  console.log('button');

  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  //Update the recipe servings(in state)
  model.updateServings(updateTo);

  //Updating the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
