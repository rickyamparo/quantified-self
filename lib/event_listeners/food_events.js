const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/'

const deleteFood = (item, foodUrl) => {
  fetch(foodUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

const deleteFoodInMeals = (id) => {
  fetch(`${url}meals`, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        const meal = meals.foods
        const mealId = meals.id
        meal.forEach ( food => {
            if (food.id == id) {
              const mealUrl = `${url}meals/${mealId}/foods/${id}`
              console.log(mealUrl)
              deleteFood(id, mealUrl)
            }
        })
      });
    })
    .catch( error => {console.log( { error })
    })
    const foodUrl = `${url}foods/${id}`
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

  // $('.food-row').click(function(){
  //   alert("You clicked on something")
  // })
  $('tbody#food-table').on("click", function(e){
    if (event.target.nodeName == "I") {
      var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
      event.target.parentElement.parentElement.remove()
      var foodUrl = `${url}foods/${foodId}`
      deleteFoodInMeals(foodId)
      setTimeout(function(){
        deleteFood(id, foodUrl)
      }, 300);
    }
  })
})
