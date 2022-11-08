import * as core from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import { AppRunnerClient, AssociateCustomDomainCommand } from "@aws-sdk/client-apprunner";
import { EksCall } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { setMaxListeners } from "process";




export class MyEcsConstructStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3 
    });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
      //vpcSubnets: vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }),
    });

    
    const subnet1 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-0c90a6ed9e6013a6b')
    const subnet2 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-0892ef7c2a15a01ed')
    const subnet3 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-0325369ea73f2e50e')
    const subnet4 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-0f6d1b1f019c928b1')
    const subnet5 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-08d01b7d0c6768294')
    const subnet6 = ec2.Subnet.fromSubnetId(this, 'SubnetFromId', 'subnet-0a51c4eaa34757251')
  
    const securityGroup = new ec2.SecurityGroup(this,"Ec2SecuriryGroup", {
      vpc,
    });

    const otherSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      "OtherSecurityGroup",
      "sg-test"
    );

    const securityGroup1 = ec2.SecurityGroup.fromLookupById(
      this,
      "securityGroup1",
      "sq-securitygroup1"
    );

    // securityGroup.addIngressRule(
    //   securityGroup1,
      
    // );

    securityGroup.addIngressRule(
      otherSecurityGroup,
      ec2.Port.tcp(432),
      "SecurityGroup of Test"
    );

  }
}