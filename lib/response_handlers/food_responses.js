const $ = require('jquery')

const appendFoods = (posts) => {
  posts.reverse()
  posts.forEach(function(post){
    $('tbody#food-table').append(`<tr class="food-row${post.id}"><td>${post.name}</td> <td>${post.calories}</td> <td><i class="fa fa-minus-circle" aria-hidden="true"></i></td></tr>`)
  })
}

const errorLog = (error) => {
  console.error(error)
}

module.exports = {errorLog, appendFoods}
