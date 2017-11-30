const $ = require('jquery')

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://serene-sea-75169.herokuapp.com/api/v1/foods"
  })
  .then(function(posts){
    posts.forEach(function(){
      $('#food-table').append(post.name)
    })
  })
  .catch(function(error){
    console.error(error)
  })
})
