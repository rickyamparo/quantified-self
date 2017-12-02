const $ = require('jquery');
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/meals'
let totalz = 0

const getAllMeals = () => {
  fetch(url, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        const meal = meals.foods
        const mealName = meals.name.toLowerCase()
        const table = $(`.${mealName}-table`)
        let totals = 0
        meal.forEach ( food => {
          table.append(`
            <tr><td>${food.name}</td>
            <td class="calories">${food.calories}</td></tr>`)
            totals += food.calories
            totalz += food.calories
        })
        $(`.${mealName}-total`).append(`${totals}`)
        remainingCal(mealName, totals)
      });
    })
    .catch( error => {console.log( { error });;
    })
    getMealTotals()
}

const getMealTotals = () => {
  let sum = 0
  $('.total').each(function(){
    console.log(totalz)
    console.log(this.innerHTML);
    debugger
  // sum += parseFloat($(this).innerHTML()); // Or this.innerHTML, this.innerText
  // console.log(sum);
});
}

const remainingCal = (id, totalCal) => {
  if (id === 'breakfast') {
    const remaining = 400 - totalCal
    $(`.${id}-remaining`).append(remaining)
  } else if (id === 'dinner') {
    const remaining = 800 - totalCal
    $(`.${id}-remaining`).append(remaining)
  } else if (id === 'lunch') {
    const remaining = 600 - totalCal
    $(`.${id}-remaining`).append(remaining)
  } else if (id === 'snack') {
    const remaining = 200 - totalCal
    $(`.${id}-remaining`).append(remaining)
  } else {
    console.log(`${id} table not found`)
  }
}

$(document).ready(function(){
  setTimeout(function(){
    getAllMeals();
  }, 200);
})
$(window).on('load', function() {
    getMealTotals();
});
module.exports = getAllMeals
