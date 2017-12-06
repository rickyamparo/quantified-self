const $ = require('jquery');
const mealResponse = require('../response_handlers/meal_responses.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

const requestMeals = (method) => {
  fetch(`${url}meals`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseArray => { method(responseArray) })
    .catch(error => {console.log( {error} )
    })
}

$(document).ready(function() {
  setTimeout(function() {
    requestMeals(mealResponse.getAllMeals);
  }, 200);
})

module.exports = requestMeals
