const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const mealRequest = require('../ajax_requests/meal_requests.js')
const foodHelper = require('../helpers/food_helpers.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

let switcher = 1

const traverseFoodInMeals = (id, method) => {
  return fetch(`${url}meals`, {method: 'GET'})
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
        foodRequest.deleteFood(mealUrl)
      }
  })
}

const eventAddFood = () => {
  const foodsUrl = url + 'foods'
  $('form.add-food').submit(function(event){
    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();
    if (name === "") {
      alert("Please enter food name")
    }
    else if (calories === "") {
      alert("Please enter calories")
    } else {
      foodRequest.postFood(name, calories, foodsUrl);
    }
    event.preventDefault();
  })
}

$(document).ready(function(){
  foodRequest.getFoods(`${url}foods`)
  eventAddFood()

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

  $(document).on("click", "i.fa.fa-minus-circle", function(){
    const foodRow = event.target.parentElement.parentElement
    const foodId = foodRow.id
    foodRow.remove()
    if (foodRow.className == "fr") {
      const foodUrl = `${url}foods/${foodId}`
      traverseFoodInMeals(foodId, deleteMealFoods)
      setTimeout(function(){
        foodRequest.deleteFood(foodUrl)
      }, 300);
    } else {
      const mealId = foodRow.className
      const mealUrl = `${url}meals/${mealId}/foods/${foodId}`
      mealRequest.deleteFood(mealUrl)
    }
  })

  $('th.calories-sort').on('click', function(){
    switcher *= -1
    const table = event.target.parentElement.parentElement.parentElement.id
    foodHelper.sortTable(table, switcher)
 })


})
