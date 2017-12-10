const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')

const getFoods = (foodUrl) => {
  fetch(foodUrl, {method: 'GET'})
  .then(response => response.json())
  .then(foodResponse.appendBothFoods)
  .catch(foodResponse.errorLog)
}

const postFood = (name, calories, foodsUrl) => {
  fetch(foodsUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "food": {
        "name": name,
        "calories": calories
      }
    })
  })
  .then(response => response.json())
  .then(response => foodResponse.appendPostedFood(response))
  .catch(error => {console.log( {error} )
  })
}

const deleteFood = (foodUrl) => {
  fetch(foodUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

const editFood = (foodUrl, data, field) => {
  fetch(foodUrl, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "food": {
        [field]: data
      }
    })
  })
    .then( response => console.log(response))
    .catch(error => {console.log({ error })
  })
  // $.ajax({
  //   type: 'PATCH',
  //   data: {food:{[field]: data}},
  //   url: foodUrl
  // }).then(response => console.log(response))
}

module.exports = {postFood, getFoods, deleteFood, editFood}
