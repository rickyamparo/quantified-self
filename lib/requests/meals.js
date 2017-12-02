const $ = require('jquery');
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/meals'

const getAllMeals = () => {
  fetch(url, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        const meal = meals.foods
        const table = $(`.${meals.name.toLowerCase()}-table`)
        debugger
        meal.forEach ( food => {
          table.append(`
            <tr><td>${food.name}</td>
            <td class="calories">${food.calories}</td></tr>`)
        })

      });
    })
    .catch( error => {console.log( { error });;
    })
}

module.exports = getAllMeals
getAllMeals();
