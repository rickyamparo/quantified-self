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
  const mealName = meals.name.toLowerCase()
  const table = $(`.${mealName}-table`)
  let mealCalories = appendFoodFromMeal(meals.foods, table)
  $(`.${mealName}-total`).append(`${mealCalories}`)
  remainingCal(mealName, mealCalories)
  return mealCalories
}

const appendFoodFromMeal = (foods, table) => {
  let calories = 0
  foods.forEach(food => {
    table.append(`
      <tr><td>${food.name}</td>
      <td class="calories">${food.calories}</td></tr>`)
      calories += food.calories
  })
  return calories
}

const colorizeCalories = (calories, total, id) => {
  const remaining = total - calories
  if (remaining < 0) {
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

module.exports = {getAllMeals}