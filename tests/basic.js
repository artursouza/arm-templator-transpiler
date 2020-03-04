d.input('namePrefix', 'string');
d.resource('azrm', 'network/virtualNetworks/subnets@2019-11-01', 'test', {name: d.call('concat', [d.identifier('namePrefix'), '-subnet'])});
d.resource('azrm', 'network/networkInterfaces@v2019-11-01', 'nic', {name: d.call('concat', [d.identifier('namePrefix'), '-nic']), properties: {ipConfigurations: {name: 'myConfig', properties: {subnet: {id: d.call('resourceId', [d.identifier('test')])}, privateIPAllocationMethod: 'Dynamic'}}}});
d.resource('azrm', 'network/publicIpAddresses@2019-11-01', 'pip', {name: d.call('concat', [d.identifier('namePrefix'), '-pip']), properties: {}});
d.output('nicResourceId', d.call('resourceId', [d.identifier('nic')]));