const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const mealRequest = require('../ajax_requests/meal_requests.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

let switcher = 1

const sortTable = (table, switcher) => {
  const tableRows = `tbody.${table}-table tr`
	var rows = $(tableRows).get();
	rows.sort(function(a, b) {
		const A = getVal(a);
		const B = getVal(b);
		if(A < B) {return -1*switcher;}
		if(A > B) {return 1*switcher;}
  return 0;
  });
  function getVal(element){
		var v = $(element).children('td').eq(1).text().toUpperCase();
		if($.isNumeric(v)){
 			v = parseInt(v,10);
		}
		return v;
}
  $.each(rows, function(index, row) {
     $(`tbody.${table}-table`).append(row);
  });
}


const deleteFood = (mealUrl) => {
  fetch(mealUrl, {method: 'DELETE'})
    .then( response => console.log(response))
    .catch( error => {console.log( { error });;
  })
}

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
        deleteFood(mealUrl)
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

  $(document).on("click", "i.fa.fa-minus-circle", function(){
    const foodId = event.target.parentElement.parentElement.id
    if (event.target.parentElement.parentElement.className == "fr") {
      event.target.parentElement.parentElement.remove()
      const foodUrl = `${url}foods/${foodId}`
      traverseFoodInMeals(foodId, deleteMealFoods)
      setTimeout(function(){
        deleteFood(foodUrl)
      }, 300);
    } else {
      event.target.parentElement.parentElement.remove()
      const mealId = event.target.parentElement.parentElement.className
      const mealUrl = `${url}meals/${mealId}/foods/${foodId}`
      deleteFood(mealUrl)
    }
  })

  $('th.calories-sort').on('click', function(){
    switcher *= -1
    const table = event.target.parentElement.parentElement.parentElement.id
    sortTable(table, switcher)
 })


})
