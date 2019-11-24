const {DialogflowConversation} = require('actions-on-google');

module.exports = function(RED) {
    "use strict";
    function intentSwitchNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            let conv = new DialogflowConversation({
                body : msg.req.body,
                headers : msg.req.headers
            })
            msg.conv = conv;
            send(msg);
        });
    }
    RED.nodes.registerType('intent-switch', intentSwitchNode);
}