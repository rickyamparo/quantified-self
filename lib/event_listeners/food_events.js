const $ = require('jquery')
const foodRequest = require('../ajax_requests/food_requests.js')

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
      alert("you clicked on delete")
    }
  })
})
