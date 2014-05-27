define([
    
], function(){
    var moduleName = 'MESSAGE MODEL';
    function log(message) {
        console.log(moduleName + ': ' + message);
    }
    log('loaded');
    
    /**
     * Message object.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {object} data
     * @return {object}
     */
    function Message(data) {
        var id = data.id || null,
            message = data['message-text'] || null,
            unread = data.unread || false,
            expanded = data.expanded || false,
            length = data['message-text'].length || 0;
    
        //used to force expanding short messages
        var shortLength = 50;
    
        function getId() {
            return id;
        }
        
        function getMessage() {
            return message;
        }
        
        function isUnread() {
            return unread;
        }
        
        /**
         * Returns first chars from message.
         * 
         * @param {int} chars
         * @returns {string}
         */
        function getIntro(chars) {
            log('get intro');
            
            if (message.length <= chars) {
                //ok, no need to chop this one
                return message;
            }
            
            //chop message and extract html tags
            var intro = message.slice(0, chars).replace(/(<([^>]+)>)/ig,"");
            return intro;
        }
        
        /**
         * Returns plain object with Message's data.
         * 
         * @returns {object}
         */
        function getData() {
            var data = {
                id: id,
                message: message,
                unread: unread,
                expanded: expanded,
                length: length
            };
            
            //NOTE: this is unused in this version
            //set message intro
            if (!unread) {
                data.intro = getIntro(40);
            }
            
            //force short messages to be expanded by default
            if (length <= shortLength) {
                data.expanded = true;
            }
            
            return data;
        }
        
        return {
            getId: getId,
            getMessage: getMessage,
            isUnread: isUnread,
            getData: getData
        };
    }
    
    return Message;
});