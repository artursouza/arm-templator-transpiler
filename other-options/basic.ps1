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

# whatever here, not runtime-ey
# can't write whatever code you want server-side

ArmTemplate Basic {
    # [af] this line is a bit confusing to me
    $rgLocation = ArmParameter 'rgLocation'
    $namePrefix = ArmParameter 'namePrefix'
    # todo - replace these with powershell params

    # "-Type", "-ApiVersion", and "-Name" can be optionally omitted here for brevity
    # [af] how do I consume this module?
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
        Name = "$namePrefix-subnet-${reference(publicIP)}" # Concat $namePrefix '-subnet' # why can't I use 'standard' powershell string concat?
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

    for ($i = 1; $i -le 2; i++) { # [af] not in love with this syntax, pretty foreign compared to c-style langs
        Resource -Module publicIP -Name "pip$i" -Values @{ # [af] would resources not get a reference here? 
            Name = Concat $namePrefix "-pip$i"
            Location = $rgLocation
        }
    }
}

# generates the ARM template
ArmTemplate -Name Foo -Location Bar # [af] not clear to me what these parameters map to











# Positional/simplified version
ArmTemplate Basic ([string]$Name, [string]$Location) { # [af] can we go over this in more depth?
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