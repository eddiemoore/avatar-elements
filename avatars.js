(function() {
    'use strict';

    function loadJSON(path, callback) {
    	var httpRequest = new XMLHttpRequest();
    	httpRequest.onreadystatechange = function() {
    		if (httpRequest.readyState === 4) {
    			if (httpRequest.status === 200) {
    				var data = JSON.parse(httpRequest.responseText);
    				if (callback) callback(data);
    			}
    		}
    	};
    	httpRequest.open('GET', path, true);
    	httpRequest.send();
    }

    var Avatar = Object.create(HTMLImageElement.prototype);

    Avatar.createdCallback = function() {
        var self = this,
            size = this.getAttribute('size') || 48,
            username = this.getAttribute('username');

        if (username) {
            var url = 'https://api.github.com/users/' + username;
        } else {
            throw new Error('Username attribute is required.');
        }

        loadJSON(url, function(data) {
            var image = data.avatar_url + '&s=' + size;
            self.setAttribute('src', image);
		});
    };

    document.registerElement('avatar-github', {
        prototype: Avatar,
        extends: 'img'
    });
}());
