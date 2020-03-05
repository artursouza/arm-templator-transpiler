"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(d) {
d.input('location', 'string');
d.input('namePrefix', 'string');
d.resource('azrm', 'network/virtualNetworks/subnets@2019-11-01', 'mySubnet', {name: d.call('concat', [d.identifier('namePrefix'), '-subnet']), location: d.identifier('location'), properties: {addressSpace: {addressPrefixes: ['10.0.0.0/24']}}});
d.resource('azrm', 'network/networkInterfaces@2019-11-01', 'myNic', {name: d.call('concat', [d.identifier('namePrefix'), '-nic']), location: d.identifier('location'), properties: {ipConfigurations: [{name: 'myConfig', properties: {subnet: {id: d.call('resourceId', [d.identifier('mySubnet')])}, privateIPAllocationMethod: 'Dynamic'}}]}});
d.resource('azrm', 'network/publicIpAddresses@2019-11-01', 'myPip', {name: d.call('concat', [d.identifier('namePrefix'), '-pip']), location: d.identifier('location'), properties: {publicIPAllocationMethod: 'Dynamic'}});
d.output('nicResourceId', d.call('resourceId', [d.identifier('myNic')]));
return d.render();
}
exports.render = render