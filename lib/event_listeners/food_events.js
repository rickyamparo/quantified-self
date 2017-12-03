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
      var foodId = event.target.parentElement.parentElement.className.match(/\d/g).join('')
      event.target.parentElement.parentElement.remove()
      var foodUrl = 'http://serene-sea-75169.herokuapp.com/api/v1/foods/' + foodId
      const deleteFood = (item) => {
        fetch(foodUrl, {method: 'DELETE'})
          .then( response => console.log(response.json()))
          .catch( error => {console.log( { error });;
        })
      }
      deleteFood(foodId);
    }
  })
})
