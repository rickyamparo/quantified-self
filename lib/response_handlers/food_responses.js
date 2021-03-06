const $ = require('jquery')

const appendBothFoods = (response) => {
  response.reverse()
  appendFood(response)
  appendFoodInMeals(response)
}

const appendFood = (response) => {
  response.forEach(function(data){
    $('tbody#food-table').append(`<tr class="fr" id="${data.id}">
                                  <td contenteditable="true" class="food-name">${data.name}</td>
                                  <td contenteditable="true" class="food-calories">${data.calories}</td>
                                  <td class="delete-cell" align="center"><i tabindex="0" class="fa fa-minus-circle" aria-hidden="true">
                                  </i></td></tr>`)
  })
}

const appendFoodInMeals = (response) => {
  response.forEach(function(data){
    $('.diary-food-table').append(`<tr class="fr" id="${data.id}">
                                   <td><input type="checkbox" class="meal-checkbox"></td>
                                   <td class="food-name">${data.name}</td>
                                   <td class="food-calories">${data.calories}</td>
                                   <td class="delete-cell" align="center"><i tabindex="0" class="fa fa-minus-circle" aria-hidden="true">
                                   </i></td></tr>`)
  })
}

const appendPostedFood = (response) => {
  $('tbody#food-table').prepend(`<tr class="fr" id="${response.id}">
                                <td contenteditable="true" class="food-name">${response.name}</td>
                                <td contenteditable="true" class="food-calories">${response.calories}</td>
                                <td class="delete-cell" align="center"><i tab index="0" class="fa fa-minus-circle" aria-hidden="true">
                                </i></td></tr>`)
}

const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, appendBothFoods, appendPostedFood}
