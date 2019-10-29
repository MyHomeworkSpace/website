api.onReady(function() {
    api.GET("/auth/me", {}, function(data) {
        if(data.status == "ok") {
            //the user is logged in
            $("#uname").text(data.name.split(" ")[0])
            $("#logout").click(function() {
                api.GET("/auth/logout", {}, function() {
                    location.reload()
                });
            })
            $("#log-in-options").hide();
            $("#log-out-options").removeClass("hidden");
            var helloWords = ["Hey", "Hi", "Hello", "Howdy", "What's up"]
            $(".hello-word").text(helloWords[Math.floor(Math.random() * helloWords.length)]);
        }
    })
})