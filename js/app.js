    
var gifs = ["food", "workout", "funny", "comedy","news","hbo","friends","the office","kardashians","naruto"];

function renderButton() {
    $("#gif-view").empty()

    for (var i=0 ; i < gifs.length; i++) {

        var newButton = $("<button>");
        newButton.addClass("itembutton");
        newButton.html(gifs[i]);
        newButton.attr("data-name", gifs[i]);
        $("#gif-view").append(newButton);
    
    }
}
renderButton();



$("#gif").on("click",  function(event) {
    
    event.preventDefault();
    var addedData = $("#gif-input").val().trim();
    if (addedData != "") {
        gifs.push(addedData);
        renderButton();
        $("#gif-input").val(" ");
    }



});  

$(document).on("click", ".itembutton", displayInfo);


function displayInfo() {
    var itemName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + itemName + "&rating=g&limit=10&api_key=TVxQvzKbz76RUCSYfQDXsZU5CHvX6uxY";
    $("#GIFArea").empty();

    $.ajax ({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        console.log(response);

        var results = response.data;

        for (var i=0; i<results.length; i++) {

            var dataImage = $("<img>");
            dataImage.attr("src", results[i].images.fixed_height_still.url);
            dataImage.attr("data-still", results[i].images.fixed_height_still.url);
            dataImage.attr("data-animate", results[i].images.fixed_height.url);
            dataImage.addClass("gif");
            dataImage.attr("data-state", "still");


            var newItemdiv = $('<div class="newItem">');
            var gifRating = results[i].rating;
            var divRating = $("<p>").text("Rating: " + gifRating);
            
            newItemdiv.append(divRating);
            newItemdiv.append(dataImage);

            $("#GIFArea").prepend(newItemdiv);



        }


    }); 


}


$("#GIFArea").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    console.log(this);
    }


    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log(this);

    }

});








