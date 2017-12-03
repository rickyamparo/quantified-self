const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')


const getFoods = () => {
  $.ajax({
    type: "GET",
    url: 'http://serene-sea-75169.herokuapp.com/api/v1/foods',
  })
  .then(foodResponse.appendFoods)
  .catch(foodResponse.errorLog)
}

const postFood = (name, calories) => {
  $.post('http://serene-sea-75169.herokuapp.com/api/v1/foods', {
    "food": {
      "name": name,
      "calories": calories
    }
  })
  .then(function(response){
    $('tbody#food-table').prepend(`<tr><td>${response.name}</td> <td>${response.calories}</td> <td><i class="fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
  })
}

module.exports = {postFood, getFoods}
