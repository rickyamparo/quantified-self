const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const mealRequest = require('../ajax_requests/meal_requests.js')
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/'

const deleteFood = (item, mealUrl) => {
  fetch(mealUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

const traverseFoodInMeals = (id, method) => {
  fetch(`${url}meals`, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        method(meals, id)
      })
    })
    .catch( error => {console.log( { error })
    })
}

const deleteMealFoods = (meals, id) => {
  const meal = meals.foods
  const mealId = meals.id
  meal.forEach ( food => {
      if (food.id == id) {
        const mealUrl = `${url}meals/${mealId}/foods/${id}`
        deleteFood(id, mealUrl)
      }
  })
}

const eventAddFood = () => {
  $('form.add-food').submit(function(event){
    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();
    if (name === "") {
      alert("Please enter food name")
    }
    else if (calories === "") {
      alert("Please enter calories")
    } else {
      foodRequest.postFood(name, calories);
    }
    event.preventDefault();
  })
}

$(document).ready(function(){
  foodRequest.getFoods()

  $('.search-input').keyup(function() {
    const items = $('.food-name');
    const filter = $('.search-input').val().toLowerCase();
    items.parent().hide()
    items.each(function() {
      if (this.innerText.toLowerCase().indexOf(filter) >= 0) {
        $(this).parent().show()
      }
    })
  })

  $('.meal-button').on("click", function(event) {
    const meal = this.innerText.toLowerCase()
    const checkbox = $('.meal-checkbox')
    checkbox.each(function() {
      if (this.checked) {
        const mealId = $(`.${meal}-table`).attr('id')
        const foodId = this.parentElement.parentElement.id
        const url = `meals/${mealId}/foods/${foodId}`
        mealRequest.postMeals(url)
      }
    })
    checkbox.prop("checked", false)
  })

  $('tbody#food-table').on("click", function(e){
    if (event.target.nodeName == "I") {
      var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
      event.target.parentElement.parentElement.remove()
      var foodUrl = `${url}foods/${foodId}`
      mealRequest.requestMeals(foodId, mealResponse.deleteMealFoods)
      // traverseFoodInMeals(foodId, deleteMealFoods)
      setTimeout(function(){
        deleteFood(foodId, foodUrl)
      }, 0)
    }
  })

})
