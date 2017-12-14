const $ = require('jquery');
const url = 'https://frozen-spire-42397.herokuapp.com.herokuapp.com/api/v1/'
const mealResponse = require('../response_handlers/meal_responses.js')

const requestMeals = (method, id) => {
  fetch(`${url}meals`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseArray => { method(responseArray, id) })
    .catch(error => {console.log( {error} )
    })
}

const postMeals = (path) => {
  fetch(`${url}${path}`, {
      method: 'POST'
    })
    .catch(error => {console.log( {error} )
  })
  .then(requestMeals(mealResponse.getAllMeals))
}

const deleteFood = (mealUrl) => {
  fetch(mealUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .then(setTimeout(function() {
      requestMeals(mealResponse.getAllMeals);
    }, 200))
    .catch( error => {console.log( { error });;
  })
}

$(document).ready(function() {
  setTimeout(function() {
    requestMeals(mealResponse.getAllMeals);
  }, 200);
})

module.exports = {requestMeals, postMeals, deleteFood}
