const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')

const getFoods = (foodUrl) => {
  $.ajax({
    type: "GET",
    url: foodUrl,
  })
  .then(foodResponse.appendBothFoods)
  .catch(foodResponse.errorLog)
}

const postFood = (name, calories) => {
  $.post('https://serene-sea-75169.herokuapp.com/api/v1/foods', {
    "food": {
      "name": name,
      "calories": calories
    }
  })
  .then(function(response){
    $('tbody#food-table').prepend(`<tr class="food-row${response.id}"><td contenteditable="true" class="name">${response.name}</td> <td contenteditable="true" class="food-calories">${response.calories}</td> <td align="center"><i class="fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
  })
}

const deleteFood = (item, foodUrl) => {
  fetch(foodUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

const editFood = (foodUrl, data, field) => {
  // fetch(foodUrl, {
  //   method: 'PATCH',
  //   contentType: 'application/json',
  //   body: JSON.stringify({
  //     food: {
  //       [field]: data
  //     }
  //   })
  // })
  //   .then( response => console.log(response))
  //   .catch(error => {console.log({ error })
  // })
  $.ajax({
    type: 'PATCH',
    data: {food:{[field]: data}},
    url: foodUrl
  })
}

module.exports = {postFood, getFoods, deleteFood, editFood}
