const $ = require('jquery');
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/'
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

$(document).ready(function() {
  setTimeout(function() {
    requestMeals(mealResponse.getAllMeals);
  }, 200);
})

module.exports = {requestMeals, postMeals}
