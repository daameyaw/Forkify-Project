import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    //1. GET THE QUERY FOR THE SEARCH FORM
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);

    //2USING THE QUERY,FETCH THE DATA FROM THE API
    await model.loadSearchResults(query);
    console.log(model.state.search.result);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();
//

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
