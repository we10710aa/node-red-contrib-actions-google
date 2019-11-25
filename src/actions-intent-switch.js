const actions_on_google = require('actions-on-google');
const {DialogflowConversation} = actions_on_google;
module.exports = function(RED) {
    "use strict";
    function intentSwitchNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        const globalContext = this.context().global;
        globalContext.set('actions-on-google',actions_on_google);
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