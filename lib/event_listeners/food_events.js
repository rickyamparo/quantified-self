const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

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

const deleteFood = (item, foodUrl) => {
  fetch(foodUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

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
        deleteFood(id, mealUrl)
      }
  })
}


$(document).ready(function(){
  foodRequest.getFoods()

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

  $(document).on("click", "i.fa.fa-minus-circle", function(){
    var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
    event.target.parentElement.parentElement.remove()
    var foodUrl = `${url}foods/${foodId}`
    traverseFoodInMeals(foodId, deleteMealFoods)
    setTimeout(function(){
      deleteFood(foodId, foodUrl)
    }, 300);
  })

  $(document).on("blur", "td.name, td.calories", function(){
    var value = event.target.textContent
    var field = event.target.className
    var foodId = event.target.parentElement.className.match(/\d/g).join('')
    var foodUrl = `${url}foods/${foodId}`
    editFood(foodUrl, value, field)
  })
})
