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
        deleteFood(id, mealUrl)
      }
  })

const deleteFoodInMeal = (mealUrl) => {
  fetch(mealUrl, {method: 'DELETE'})
    .then(response => console.log(response))
    .catch(error => {console.log({ error })})
}

$(document).ready(function(){
  foodRequest.getFoods(url+'foods')

  $('th.calories-sort').on('click', function(){
    switcher *= -1
    const table = event.target.parentElement.parentElement.parentElement.id
    sortTable(table, switcher)
  })

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

  $(document).on("click", "i.fa.fa-minus-circle", function(){
    const foodRow = event.target.parentElement.parentElement
    const foodId = foodRow.id
    if (foodRow.className == "fr") {
      const foodUrl = `${url}foods/${foodId}`
      traverseFoodInMeals(foodId, deleteMealFoods)
      .then(function() {
        foodRequest.deleteFood(foodId, foodUrl)
      })
    } else {
      const mealId = foodRow.className
      const mealUrl = `${url}meals/${mealId}/foods/${foodId}`
      deleteFoodInMeal(mealUrl)
    }
    foodRow.remove()
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
