define([
    'jquery'
], function($){
    var moduleName = 'APP';
    function log(message) {
        console.log(moduleName + ': ' + message);
    }
    log('loaded');
    
    function events() {
        $('.led-switch').on('click', function(){
            var $el = $(this),
                data = $el.data(),
                id = data.id,
                command = data.command,
                relay = data.relay || 1;

            log('SENDING COMMAND "' + command + '" TO DEVICE ' + id + ', relay ' + relay + '...');
            sendCommand(id, command, relay);
        });
    }

    function sendCommand(id, command, relay) {
        log('DEVICE ' + id + ', relay ' + relay + ': ' + command);
        $.get('/' + id + '/' + command + '/' + relay, function(response){
            log('RESPONSE:');
            console.log(response);
            if (response.message) {
                showMessage(response.message);
            }
        });
    }

    var messageTimeoutRef;
    function showMessage(message) {
        clearTimeout( messageTimeoutRef );
        $('#message').html(message).removeClass('hidden');
        messageTimeoutRef = setTimeout(function(){
            $('#message').addClass('hidden');
        }, 1000 * 2);
    }

    function init(){
        console.log('APP init');
        events();
    }
    
    //public interface
    return {
        init: init
    };
});