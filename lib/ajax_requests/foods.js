const $ = require('jquery')

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://serene-sea-75169.herokuapp.com/api/v1/foods"
  })
  .then(appendFoods)
  .catch(errorLog)
})

const appendFoods = (posts) => {
  posts.forEach(function(post){
    $('table#food-table').append(`<tr><td>${post.name}</td> <td>${post.calories}</td></tr>`)
  })
}

const errorLog = (error) => {
  console.error(error)
}
