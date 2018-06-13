'use strict';

var _Search = require('./models/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Recipe = require('./models/Recipe');

var _Recipe2 = _interopRequireDefault(_Recipe);

var _searchView = require('./views/searchView');

var searchViews = _interopRequireWildcard(_searchView);

var _recipeViews = require('./views/recipeViews');

var recipeViews = _interopRequireWildcard(_recipeViews);

var _base = require('./views/base');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// ***GLOBAL STATE***
// - Search object
// - Current recipie object
// - Shopping list object
// - Linked recipies

var state = {};

/**
* Search controler
*/
var controlSearch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var query;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 1. Get query from view
            query = searchViews.getInput(); //todo

            if (!query) {
              _context.next = 18;
              break;
            }

            // 2. Create new search object and add it to state
            state.search = new _Search2.default(query);

            // 3. Prepare UI for results - loading spinner
            searchViews.clearInput(); //izpraznemo search field
            searchViews.clearResults(); //izbrišemo vsebino ul-ja
            (0, _base.renderLoader)(_base.elements.searchResults); //naložimo lader svg

            _context.prev = 6;
            _context.next = 9;
            return state.search.getResults();

          case 9:
            //potegnemo recepte
            console.log('Downolading recipes...');

            // 5. Render results on UI
            (0, _base.clearLoader)(); // odmaknemo loader
            searchViews.renderResults(state.search.result); //dodamo recepte v html
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](6);

            alert('Something went wrong with the search...');
            (0, _base.clearLoader)();

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 14]]);
  }));

  return function controlSearch() {
    return _ref.apply(this, arguments);
  };
}();

_base.elements.searchForm.addEventListener('submit', function (e) {
  //event listner na search formi
  e.preventDefault(); //preprečimo, da se stran ponovno naloži
  controlSearch();
});

_base.elements.searchResultPages.addEventListener('click', function (e) {
  var btn = e.target.closest('.btn-inline');
  if (btn) {
    var goToPage = parseInt(btn.dataset.goto, 10);
    searchViews.clearResults();
    searchViews.renderResults(state.search.result, goToPage);
  }
});

/**
* Recipe controler
*/

var controlRecipe = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = window.location.hash.replace('#', '');

            //1. Prepere UI for changes

            recipeViews.clearRecipe();
            (0, _base.renderLoader)(_base.elements.recipe);
            if (state.search) {
              recipeViews.highlightSelected(id);
            }

            //2. Create new recipe object and add it to the state
            state.recipe = new _Recipe2.default(id);

            _context2.prev = 5;
            _context2.next = 8;
            return state.recipe.getRecipe();

          case 8:
            state.recipe.parseIngredients();

            //4. Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //5. Render recipe
            (0, _base.clearLoader)();
            recipeViews.renderRecipe(state.recipe);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](5);

            alert('Error processing recipe' + _context2.t0);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 15]]);
  }));

  return function controlRecipe() {
    return _ref2.apply(this, arguments);
  };
}();

['hashchange', 'load'].forEach(function (event) {
  return window.addEventListener(event, controlRecipe);
});

//Handling recipe button click
//# sourceMappingURL=index.js.map