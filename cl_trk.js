// trck
var cohaTrkLive    = true
var cohaTrkDebugUrl = 'http://10.0.0.64:8000/coha-tracking/coha-tracking-server'
// var cohaTrkLiveUrl  = 'https://tools.corporate-happiness.de/coha-tracking-server'
var cohaTrkLiveUrl  = 'https://das-neue-fuehren.de/coha-tracking-server/'

if (window.location.origin) {
	cohaTrkLiveUrl = window.location.origin + '/coha-tracking-server/'
}

var cohaTrk = {
    trk_url: cohaTrkLive ? cohaTrkLiveUrl : cohaTrkDebugUrl, // '/coha-tracking/coha-tracking-server/',
    method: 'POST',

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
        return jQuery('#_coha_trck_uid_421').val() || 'nousername'
    }
}

cohaTrk.ajax = function (_data) {
    jQuery.ajax({
        method: cohaTrk.method,
        url: cohaTrk.trk_url,
        data: _data,
    });
}

jQuery( document ).ready(function($) {
    cohaTrk.ajax({
        _href:        window.location.href || '',
        _type:        'open',
        _agent:       JSON.stringify(navigator?.userAgent || ''),
        _username:    cohaTrk.getUsername(),
        _userid:      cohaTrk.getRandomId(),
    })

    setInterval(() => {
        cohaTrk.ajax({
            _type: 'ping',
            _username:  cohaTrk.getUsername,
            _userid:    cohaTrk.getRandomId,
        })
    }, 10 * 1000);
});
