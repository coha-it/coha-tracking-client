// trck

var cohaTrk = {
    guid: function () {
        function s4 () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return Date.now() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getRandomId: function() {
        if (typeof localStorage !== 'undefined') {
            let _trk_id = localStorage.getItem('___trksdfh_ssid');
            if (!_trk_id) {
                _trk_id = this.guid();
                localStorage.setItem('___trksdfh_ssid', _trk_id);
            }
            return _trk_id;
        }
        // localStorage not defined
        return 'error_local_storage';
    },
    getUsername: function () {
        return 'jo'
    }
}

jQuery( document ).ready(function($) {
    // Variables
    const trk_url = 'http://10.0.0.64:8000/coha-tracking/coha-tracking-server/';
    const method = 'POST'
    const data = {
        _href:        window.location.href || '',
        _type:        'open' || '',
        _agent:       JSON.stringify(navigator?.userAgent || ''),
        _username:    cohaTrk.getUsername(),
        _userid:      cohaTrk.getRandomId(),
    }

    console.log(data)

    $.ajax({
        method: method,
        url: trk_url,
        data: data,
    });
});
