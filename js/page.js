api.onReady(function() {
	api.get("auth/me", {}, function(data) {
		if (data.status == "ok") {
			$("#user-name").text(data.name);
			$("#log-in-options").hide();
			$("#log-out-options").removeClass("hidden");
			var helloWords = ["Hey", "Hi", "Hello", "Howdy", "What's up"];
			$(".hello-word").text(helloWords[Math.floor(Math.random() * helloWords.length)]);
		}
	});
});

window.addEventListener("load", function() {
	document.getElementById("logout").addEventListener("click", function() {
		api.get("auth/logout", {}, function() {
			window.location.reload();
		});
	});
});