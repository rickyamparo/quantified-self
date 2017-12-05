const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

const traverseFoodInMeals = (id, method) => {
  fetch(`${url}meals`, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        deleteMealFoods(meals, id)
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
        foodRequest.deleteFood(id, mealUrl)
      }
  })
}

$(document).ready(function(){
  foodRequest.getFoods(url+'foods')

  $('form.add-food').submit(function(event){
    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();
    if (name === "") {
      $('div.warning').remove()
      $('form.add-food').append("<div class='warning'>You need to enter in a Name</div>")
    }
    else if (calories === "") {
      $('div.warning').remove()
      $('form.add-food').append("<div class='warning'>You need to enter in Calories</div>")
    } else {
      $('div.warning').remove()
      foodRequest.postFood(name, calories);
    }
    event.preventDefault();
  })


  $(document).on("click", "i.fa.fa-minus-circle", function(){
    var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
    event.target.parentElement.parentElement.remove()
    var foodUrl = `${url}foods/${foodId}`
    traverseFoodInMeals(foodId, deleteMealFoods)
    setTimeout(function(){
      foodRequest.deleteFood(foodId, foodUrl)
    }, 300);
  })
})
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


  $(document).on("blur", "td.name, td.calories", function(){
    var value = event.target.textContent
    var field = event.target.className
    var foodId = event.target.parentElement.className.match(/\d/g).join('')
    var foodUrl = `${url}foods/${foodId}`
    foodRequest.editFood(foodUrl, value, field)

  $('tbody#food-table').on("click", function(e){
    if (event.target.nodeName == "I") {
      var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
      event.target.parentElement.parentElement.remove()
      var foodUrl = `${url}foods/${foodId}`
      traverseFoodInMeals(foodId, deleteMealFoods)
      setTimeout(function(){
        deleteFood(foodId, foodUrl)
      }, 300);
    }

  })
})
