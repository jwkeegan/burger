// Wait to attach handlers until DOM is fully loaced
$(function() {
    // Delete button -> delete from database and webpage
    $(".delete").on("click", function(event) {
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE",
        }).then(
            function() {
                console.log("Deleted Burger #" + id);
                location.reload();
            }
        );
    });

    // Devour button -> update devoured from false to true
    $(".devour").on("click", function(event) {
        event.preventDefault();

        // capture id stored in button
        var id = $(this).data("id");
        var update = {
            devoured: true
        };

        // Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: update
        }).then(
            function() {
                console.log("Devoured Burger #" + id);
                // Reload Page to show updates
                location.reload();
            }
        );
    });

    $(".new-burger").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger-input").val().trim(),
            devoured: 0
        };

        // Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("added new burger");
                // Reload Page to show updates
                location.reload();
            }
        );
    });
});