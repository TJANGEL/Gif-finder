// Initial arrays
var gifsArr = ["rick and morty", "the walking dead", "ray donovan", "the deuce",
  "the simpsons", "kidding", "ballers", "shameless", "american horror story",
  "it's always sunny in philadelphia", "south park", "elementary", "mordern family", "the haunting of hill house"];

function renderButtons() {

  $("#buttonPanel").empty();

  for (var i = 0; i < gifsArr.length; i++) {

    var button = $("<button>");
    button.addClass("gifButton");
    button.attr("data-gif", gifsArr[i]);
    button.text(gifsArr[i]);

    $("#buttonPanel").append(button);
  }
}

$("#add-gif").on("click", function (event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  gifsArr.push(gif);
  $("#gif-input").val("");

  renderButtons();
});

function fetchGifs() {

  var gifName = $(this).attr("data-gif");
  var gifStr = gifName.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifStr +
    "&rating=pg-13&limit=20&api_key=xrIhtNV4IEaqVCo4Ese4sXx1vqrBq9FZ";

  $.ajax({
    method: "GET",
    url: queryURL,
  })
    .done(function (result) {
      var dataArray = result.data;

      $("#gifPanel").empty();
      for (var i = 0; i < dataArray.length; i++) {
        var newDiv = $("<div>");
        newDiv.addClass("gif");

        var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
        newDiv.append(newRating);

        var newImg = $("<img>");
        newImg.attr("src", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
        newImg.attr("data-state", "still");
        newDiv.append(newImg);

        $("#gifPanel").append(newDiv);
      }
    });
}

function animateGif() {

  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function () {
  renderButtons();
});

$(document).on("click", ".gifButton", fetchGifs);

$(document).on("click", ".gif", animateGif);