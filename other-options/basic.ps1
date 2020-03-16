#requires -Module ArmDslGenerator -Version 1.0.0.0

param (
    [Parameter()]
    [string]
    $vault
)

$secret = Get-Secret -Name myServicePrincipal -Vault $vault

# optionally can do a runtime invocation
Import-Module ArmDslGenerator -Version 1.0.0.0
Import-Module OptionalHelper -Version 2.0

# [af] why isn't this inside the ArmTemplate Basic?
ArmVariable $subnetReferce = @{
    ID = resourceID mySubnet
}

ArmTemplate Basic {
    # [af] this line is a bit confusing to me
    $rgLocation = ArmParameter 'rgLocation'
    $namePrefix = ArmParameter 'namePrefix'

    # "-Type", "-ApiVersion", and "-Name" can be optionally omitted here for brevity
    ResourceModule -Type 'Network/publicIpAddresses' -ApiVersion '2019-11-01' -Name publicIP {
        param(
            [string]$Name,
            [string]$Location
        )

        Name = $Name
        Location = $Location
        Properties = @{
            publicIPAllocationMethod = 'Dynamic'
            servicePrincipal = $secret
        }
    }

    Resource 'network/virtualNetworks/subnets' '2019-11-01' mySubnet {
        Name = Concat $namePrefix '-subnet'
        Location = $rgLocation
        Properties = @{
            AddressSpace = @{
                AddressPrefixes = '10.0.0.0/24'
            }
        }
    }

    Resource -Type 'network/networkInterfaces' -ApiVersion '2019-11-01' -Name myNic {
        Name = Concat $namePrefix '-nic'
        Location = $rgLocation
        Properties = @{
            ipConfigurations = @(
                @{
                  Name = 'myConfig'
                  Properties = @{
                        Subnet = $subnetReference
                        privateIPAllocationMethod = 'Dynamic'
                  }  
                }
            )
        }
    }

    for($i = 1; $i -le 2; i++) {
        Resource -Module publicIP -Name "pip$i" -Values @{ 
            Name = Concat $namePrefix "-pip$i"
            Location = $rgLocation
        }
    }
}

# generates the ARM template
ArmTemplate -Name Foo -Location Bar











# Positional/simplified version
ArmTemplate Basic ([string]$Name, [string]$Location) {
    Resource 'Network/publicIpAddresses' '2019-11-01' publicIP {
        Name = $Name
        Location = $Location
        Properties = @{
            publicIPAllocationMethod = 'Dynamic'
            servicePrincipal = $secret
        }

    Resource 'Network/virtualNetworks/subnets' '2019-11-01' mySubnet {
        Name = Concat [ArmVariable]'namePrefix' '-subnet'
        Location = $rgLocation
    }
}