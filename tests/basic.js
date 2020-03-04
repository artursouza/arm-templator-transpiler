d.input('namePrefix', 'string');
d.resource('azrm', 'network/virtualNetworks/subnets@2019-11-01', 'mySubnet', {name: d.call('concat', [d.identifier('namePrefix'), '-subnet'])});
d.resource('azrm', 'network/networkInterfaces@2019-11-01', 'myNic', {name: d.call('concat', [d.identifier('namePrefix'), '-nic']), properties: {ipConfigurations: {name: 'myConfig', properties: {subnet: {id: d.call('resourceId', [d.identifier('mySubnet')])}, privateIPAllocationMethod: 'Dynamic'}}}});
d.resource('azrm', 'network/publicIpAddresses@2019-11-01', 'myPip', {name: d.call('concat', [d.identifier('namePrefix'), '-pip']), properties: {}});
d.output('nicResourceId', d.call('resourceId', [d.identifier('nic')]));