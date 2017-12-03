const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')

$(document).ready(function(){
  foodRequest.getFoods()

  $('div.foods').submit(function(event){
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


})
