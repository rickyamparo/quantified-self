const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')
const url = 'https://serene-sea-75169.herokuapp.com/api/v1/'

const sortTable = (table) => {
  const tableRows = `tbody.${table}-table tr`
	var rows = $(tableRows).get();
	rows.sort(function(a, b) {
		const A = getVal(a);
		const B = getVal(b);
		if(A < B) {return -1;}
		if(A > B) {return 1;}
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
      responseArray.forEach( meal => {
        deleteMealFoods(meal, id)
        method(meal, id)
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

const deleteFoodInMeal = (mealUrl) => {
  fetch(mealUrl, {method: 'DELETE'})
    .then(response => console.log(response))
    .catch(error => {console.log({ error })})
}

$(document).ready(function(){
  foodRequest.getFoods(url+'foods')

  $('th.calories-sort').on('click', function(){
    const n = $(this).prevAll().length;
    const table = event.target.parentElement.parentElement.parentElement.id
    sortTable(table)
  })

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


$('tbody#food-table').on("blur", "td.food-name, td.food-calories", function(){
  var value = event.target.textContent
  var field = event.target.className.replace(/^food-+/i, '')
  var foodId = event.target.parentElement.className.match(/\d/g).join('')
  var foodUrl = `${url}foods/${foodId}`
  foodRequest.editFood(foodUrl, value, field)
})
