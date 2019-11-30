const {Permission} = require('actions-on-google')
module.exports = function(RED) {
    "use strict";
    function askPermission(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        this.on('input', (msg, send, done) => {
            send = send || function() {node.send.apply(node, arguments)};
            const {context,namepermission, preciselocation, coarselocation, update} = config;
            const permissions = [];
            if(namepermission){
                permissions.push('NAME');
            }
            if(preciselocation){
                permissions.push('DEVICE_PRECISE_LOCATION');
            }
            if(coarselocation){
                permissions.push('DEVICE_COARSE_LOCATION');
            }
            if(update){
                permissions.push('UPDATE');
            }
            msg.conv.ask(new Permission({
                context: context,
                permissions: permissions
            }))
            send(msg);
        })
    }
    RED.nodes.registerType('Permission', askPermission);
    
}