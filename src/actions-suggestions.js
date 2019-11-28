const {Suggestions} = require('actions-on-google')
module.exports = function(RED) {
    "use strict";
    function addSimpleResponse(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            if(Array.isArray(msg.suggestions)){
                msg.conv.ask(new Suggestions(msg.suggestions));
            }
            else{
                const {suggestions} = config;
                msg.conv.ask(new Suggestions(suggestions.split(',')));
            }
            send(msg);
        })
    }
    RED.nodes.registerType('Suggestions', addSimpleResponse);
    
}