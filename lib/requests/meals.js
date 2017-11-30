const $ = require('jquery');


$.getJSON("https://serene-sea-75169.herokuapp.com/api/v1/meals")
    .then(function(meals){
        meals.forEach(function(meal){
            // console.log(meal.foods)
            var things = meal.foods
            things.forEach(function(thingy) {
              console.log(thingy.name)
            })
        })
    })
    .catch(function(error) {
        // console.error(error)
    })
