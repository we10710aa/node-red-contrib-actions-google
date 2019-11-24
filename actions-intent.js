
module.exports = function(RED) {
    "use strict";
    function intentHandler(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            this.intentName = config.intentName;
            if(msg.conv.intent != this.intentName) {
                return;
            }
            else {
                send(msg);
            }
        })
    }
    RED.nodes.registerType('intent', intentHandler);
    
}