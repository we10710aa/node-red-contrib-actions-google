const {SimpleResponse} = require('actions-on-google')
module.exports = function(RED) {
    "use strict";
    function addSimpleResponse(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            const msgtext = msg.simpleresponse && msg.simpleresponse.text;
            const msgspeech = msg.simpleresponse && msg.simpleresponse.speech;
            if(msgtext){
                msg.conv.ask(new SimpleResponse({
                    text: msgtext,
                    speech: msgspeech || msgtext
                }));
            }
            else{
                const {text,speech} = config;
                msg.conv.ask(new SimpleResponse({
                    text: text,
                    speech: speech || text
                }));
            }
            send(msg);
        })
    }
    RED.nodes.registerType('simple-response', addSimpleResponse);
    
}