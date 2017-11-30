const $ = require('jquery')

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://serene-sea-75169.herokuapp.com/api/v1/foods"
  })
  .then(function(posts){
    posts.forEach(function(post){
      $('table#food-table').append(`<tr><td>${post.name}</td> <td>${post.calories}</td></tr>`)
    })
  })
  .catch(function(error){
    console.error(error)
  })
})
