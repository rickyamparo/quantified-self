const $ = require('jquery')

const appendFoods = (posts) => {
  posts.reverse()
  posts.forEach(function(post){
    $('tbody#food-table').append(`<tr><td>${post.name}</td> <td>${post.calories}</td></tr>`)
  })
}

const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, appendFoods}
