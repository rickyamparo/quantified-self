const $ = require('jquery')


const foodResponse = (response) => {
  response.reverse(response)
  appendFood(response)
  appendFoodInMeals(response)
}

const appendFood = (response) => {
  response.forEach(function(data){
    $('tbody#food-table').append(`<tr class="fr food-row${data.id}"><td contenteditable="true" class="food-name name">${data.name}</td> <td contenteditable="true" class="calories">${data.calories}</td> <td><i class="fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
  })
}

const appendFoodInMeals = (response) => {
  response.forEach(function(data){
    $('.diary-food-table').append(`<tr class="fr food-row${data.id}"><td><input type="checkbox" name="vehicle" value="something"></td><td class="food-name">${data.name}</td> <td>${data.calories}</td></tr>`)
  })
}


const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, foodResponse}
