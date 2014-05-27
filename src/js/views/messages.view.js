define([
    'jquery',
    'lodash',
    'tpl!templates/message.tpl',
    'models/message.model'
], function($, _, messageTemplate, MessageModel){
    var moduleName = 'MESSAGES VIEW';
    function log(message) {
        console.log(moduleName + ': ' + message);
    }
    log('loaded');
    
    //MODULE PROPERTIES
    var messages = [], //messages collection
        el = '#messages',
        $el = $(el);
        
    /**
     * Collapsed an expanded message.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {int} id
     */
    function collapse(id, $message) {
        log('collapse: ' + id);
        $message.removeClass('expanded').addClass('collapsed');
    }
    
    /**
     * Expands a collapsed message.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {int} id
     */
    function expand(id, $message) {
        log('expand: ' + id);
        $message.removeClass('collapsed').addClass('expanded');
    }
    
    //--------------------------------------------------------------------------
    //VIEW EVENTS
    function attachEvents() {
        //collapsed click
        $el.on('click', '.collapsed', function(){
            var $message = $(this);
            var data = $message.data(),
                id = data.id;
                
            log('collapsed clicked: ID: ' + id);
            expand(id, $message);
        });
        
        //expanded click
        $el.on('click', '.expanded', function(){
            var $message = $(this);
            var data = $message.data(),
                id = data.id;
                
            log('expanded clicked: ID: ' + id);
            collapse(id, $message);
        });
    }
    //--------------------------------------------------------------------------
    
    /**
     * Sets messsages collection from passed data.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {array} data
     * @returns {undefined}
     */
    function set(data) {
        log('set');
        messages = data;
        return this; //chaining
    }
    
    /**
     * Renders current messages collection.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     */
    function render() {
        log('render');
        console.log(messages);
        
        //always display first message expanded
        messages[0].expanded = true;
        
        var html = '',
            messageObj;
        _.each(messages, function(data){
            messageObj = new MessageModel(data);
            html += messageTemplate( messageObj.getData() );
        });
        $el.html(html);
        
        attachEvents();
    }
    
    
    //public interface
    return {
        set: set,
        render: render
    };
});