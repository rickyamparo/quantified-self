const $ = require('jquery');
const url = 'http://serene-sea-75169.herokuapp.com/api/v1/'

const getAllMeals = () => {
  let dailyCal = 0
  fetch(`${url}meals`, {method: 'GET'})
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
          dailyCal += food.calories
        })
        $(`.${mealName}-total`).append(`${totals}`)
        remainingCal(mealName, totals)
      });
      dailyCalories(dailyCal)
    })
    .catch( error => {console.log( { error })
    })
}

const getFoodInMeals = (id) => {
  fetch(`${url}meals`, {method: 'GET'})
    .then( response => response.json())
    .then( responseArray => {
      responseArray.forEach( meals => {
        const meal = meals.foods
        const mealId = meals.id
        meal.forEach ( food => {
            if (food.id === id) {
              console.log(`${mealId} + ${id}`)
            }
        })
      });
    })
    .catch( error => {console.log( { error })
    })
}

const colorizeCalories = (calories, total, id) => {
  const remaining = total - calories
  if (remaining < 0 ) {
    $(`.${id}-remaining`).append(`<font color="red">${remaining}</font>`)
  } else {
    $(`.${id}-remaining`).append(`<font color="green">${remaining}</font>`)
  }
}

const dailyCalories = (calories) => {
  $('.daily-total').append(calories)
  colorizeCalories(calories, 2000, 'daily')
}

const remainingCal = (id, totalCal) => {
  if (id === 'breakfast') {
    colorizeCalories(totalCal, 400, id)
  } else if (id === 'dinner') {
    colorizeCalories(totalCal, 800, id)
  } else if (id === 'lunch') {
    colorizeCalories(totalCal, 600, id)
  } else if (id === 'snack') {
    colorizeCalories(totalCal, 200, id)
  } else {
    console.log(`${id} table not found`)
  }
}

$(document).ready(function(){
  setTimeout(function(){
    getAllMeals();
    getAllMealsSearch(12);
  }, 200);
})

module.exports = getAllMeals
