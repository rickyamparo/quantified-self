const $ = require('jquery')

const foodResponse = (response) => {
  appendFood(response)
  appendFoodInMeals(response)
}

const appendFood = (response) => {
  response.reverse(response)
  response.forEach(function(data){
    $('tbody#food-table').append(`<tr class="food-row${data.id}"><td>${data.name}</td> <td>${data.calories}</td> <td><i class="fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
  })
}

const appendFoodInMeals = (response) => {
  response.reverse()
  response.forEach(function(data){
    $('.diary-food-table').append(`<tr class="food-row${data.id}"><td><input type="checkbox" name="vehicle" value="something"></td><td>${data.name}</td> <td>${data.calories}</td></tr>`)
  })
}


const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, foodResponse}
