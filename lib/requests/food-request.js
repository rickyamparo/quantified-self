$(document).ready(function(){
  $.get("https://serene-sea-75169.herokuapp.com/api/v1/foods")
    .then(function(posts){
      posts.forEach(function(post){
        $("#food-table").append(post)
      })
    })
    .catch(errorLog)
}

const errorLog = (error) => {
  console.error(error)
}
