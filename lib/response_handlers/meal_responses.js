const $ = require('jquery');

const getAllMeals = (responseArray) => {
  let dailyCal = 0
  responseArray.forEach(meals => {
    let calories = appendMeals(meals)
    dailyCal += calories
  })
  dailyCalories(dailyCal)
}

const appendMeals = (meals) => {
  console.log(meals)
  const mealName = meals.name.toLowerCase()
  const table = $(`.${mealName}-table`)
  table.empty()
  table.attr('id', `${meals.id}`)
  let mealCalories = appendFoodFromMeal(meals, table)
  $(`.${mealName}-total`).html(`${mealCalories}`)
  remainingCal(mealName, mealCalories)
  return mealCalories
}

const appendFoodFromMeal = (meals, table) => {
  let calories = 0
  meals.foods.forEach(food => {
    table.append(`
      <tr class="${meals.id}" id="${food.id}"><td>${food.name}</td>
      <td class="food-calories">${food.calories}</td>
      <td class="delete-cell" align="center"><i class="fa fa-minus-circle" aria-hidden="true">
      </i></td></tr>`)
      calories += parseInt(food.calories)
  })
  return calories
}

const colorizeCalories = (calories, total, id) => {
  const remaining = total - calories
  if (remaining < 0) {
    $(`.${id}-remaining`).html(`<font color="red">${remaining}</font>`)
  } else {
    $(`.${id}-remaining`).html(`<font color="green">${remaining}</font>`)
  }
}

const dailyCalories = (calories) => {
  $('.daily-total').html(calories)
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

module.exports = {getAllMeals}
