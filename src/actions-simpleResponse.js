const {SimpleResponse, Suggestions} = require('actions-on-google')
module.exports = function(RED) {
    "use strict";
    function addSimpleResponse(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            const msgtext = msg.simpleresponse && msg.simpleresponse.text;
            const msgspeech = msg.simpleresponse && msg.simpleresponse.speech;
            const text = msgtext || config.text;
            const speech = msgspeech || config.speech;

            msg.conv.ask(new SimpleResponse({
                text: text,
                speech: speech ||  text
            }));

            if(config.suggestions){
                msg.conv.ask(new Suggestions(config.suggestions.split(',')));
            }
            send(msg);
        })
    }
    RED.nodes.registerType('simple-response', addSimpleResponse);
    
}