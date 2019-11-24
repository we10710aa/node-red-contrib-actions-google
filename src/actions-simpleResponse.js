module.exports = function(RED) {
    "use strict";
    function addSimpleResponse(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            this.response = config.response;
            msg.conv.ask(this.response);
            send(msg);
        })
    }
    RED.nodes.registerType('simple-response', addSimpleResponse);
    
}