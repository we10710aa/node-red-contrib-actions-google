const {SimpleResponse} = require('actions-on-google')
module.exports = function(RED) {
    "use strict";
    function addSimpleResponse(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            const {text,speech} = config;
            msg.conv.ask(new SimpleResponse({
                text: text,
                speech: speech
            }));
            send(msg);
        })
    }
    RED.nodes.registerType('simple-response', addSimpleResponse);
    
}