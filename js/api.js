var api = {
	ready: false,
	token: null,
	baseURL: window.location.protocol + "//api-v2." + window.location.hostname + "/",

	get: function(path, data, callback) {
		return this.rawRequest(path, "GET", data, callback);
	},
	post: function(path, data, callback) {
		return this.rawRequest(path, "POST", data, callback);
	},

	buildParamStr: function(data) {
		if (!data) {
			return "";
		}

		var paramStr = "";

		var first = true;
		for (var key in data) {
			var value = data[key];
			if (first) {
				first = false;
			} else {
				paramStr += "&";
			}
			paramStr += key;
			paramStr += "=";
			paramStr += encodeURIComponent(value);
		}

		return paramStr;
	},
	buildURL: function(path, method, data) {
		var paramStr = this.buildParamStr(data, method);

		if (this.token) {
			path = path + "?csrfToken=" + encodeURIComponent(this.token);
			if (Object.keys(data).length != 0) {
				path += "&";
			}
		} else if (paramStr) {
			path = path + "?";
		}

		return this.baseURL + path + (method == "GET" ? paramStr : "");
	},
	rawRequest: function(path, method, data, callback) {
		var paramStr = this.buildParamStr(data, method);
		var request = new XMLHttpRequest();

		request.withCredentials = true;
		request.open(method, this.buildURL(path, method, data), true);
		request.onload = function() {
			callback(JSON.parse(request.responseText), request);
		};
		request.onerror = function() {
			callback({
				status: "error",
				error: "disconnected"
			}, request);
		};
		if (method == "POST") {
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		}
		request.send(method == "POST" ? paramStr : undefined);
	},
	onReady: function(callback) {
		if (this.ready) {
			callback();
			return true;
		} else {
			this.onReadyEvents.push(callback);
			return false;
		}
	},
	onReadyEvents: [],
};

window.addEventListener("load", function() {
	api.rawRequest("auth/csrf", "GET", {}, function(data) {
		api.token = data.token;
		api.ready = true;
		api.onReadyEvents.forEach(function(callback) {
			callback();
		});
	});
});