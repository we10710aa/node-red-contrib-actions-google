module.exports = function(RED) {
    "use strict";
    function serialize(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            var newMsg = {
                payload: msg.conv.serialize(),
                statusCode: 200,
                headers: {},
                res: msg.res
            };
            send(newMsg);
        });
    }
    RED.nodes.registerType('actions-serialize', serialize);
}