const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://serene-sea-75169.herokuapp.com/api/v1/foods"
  })
  .then(foodResponse.appendFoods)
  .catch(foodResponse.errorLog)
})
