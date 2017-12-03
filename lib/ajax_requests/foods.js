const $ = require('jquery')
const foodResponse = require('../response_handlers/food_responses.js')
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/foods'

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: url
  })
  .then(foodResponse.appendFoods)
  .catch(foodResponse.errorLog)

  $('div.foods').submit(function(event){
    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();
    if (name === "") {
      alert("Please enter food name")
    }
    else if (calories === "") {
      alert("Please enter calories")
    } else {
      const postFood = (name, calories) => {
        $.post(url, {
          "food": {
            "name": name,
            "calories": calories
          }
        })
        .then(function(response){
          $('table#food-table').append(`<tr><td>${response.name}</td> <td>${response.calories}</td></tr>`)
        })
      }
      postFood(name, calories);
    }
    event.preventDefault();
  })
})
