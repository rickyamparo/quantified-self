const $ = require('jquery')

const appendFoods = (posts) => {
  posts.forEach(function(post){
    $('table#food-table').append(`<tr><td>${post.name}</td> <td>${post.calories}</td></tr>`)
  })
}

const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, appendFoods}
