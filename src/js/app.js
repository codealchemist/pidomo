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
                command = data.command;

            log('SENDING COMMAND "' + command + '" TO DEVICE ' + id + '...');
            sendCommand(id, command);
        });
    }

    function sendCommand(id, command) {
        log('DEVICE ' + command + ': ' + id);
        $.get('/' + id + '/' + command, function(response){
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