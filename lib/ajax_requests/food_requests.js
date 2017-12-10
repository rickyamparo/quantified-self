const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')

const getFoods = (foodUrl) => {
  fetch(foodUrl, {method: 'GET'})
  .then(response => response.json())
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
  .then(foodResponse.appendPostedFood)
}

const deleteFood = (foodUrl) => {
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
  }).then(response => console.log(response))
}

module.exports = {postFood, getFoods, deleteFood, editFood}
