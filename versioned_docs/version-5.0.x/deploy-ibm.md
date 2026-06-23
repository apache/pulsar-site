---
id: deploy-ibm
title: Apache Pulsar Installation on IBM Kubernetes Cluster through Helm chart
sidebar_label: "IBM Cloud Services"
original_id: deploy-ibm
description: Learn to deploy a Pulsar cluster on IBM cloud.
---

:::tip

This tutorial uses Apache Pulsar 2.9.3 as an example. If you want to upgrade Pulsar version, follow the instructions in [Helm Upgrade Guide](https://pulsar.apache.org/docs/2.10.x/helm-upgrade/).

:::


Deploying a Pulsar cluster on IBM cloud consists of the following steps.

## Step 1: Create VM on IBM Cloud

1. Go to [IBM Cloud]( https://cloud.ibm.com/?cm_sp=freelancer-_-pulsar-iks-_-cta)  and login with your credentials.
2. Search for Virtual Server.
3. Select Virtual Server for Classic.

![VM Creation Image 1](/assets/IBMCloud/VM1.png)

4. Select the type of virtual server as selected "Public" in the image.
  Type the host name, quantity of the machine and billing method.

![VM Creation Image 2](/assets/IBMCloud/VM2.png)

5. Select location value according to your region. For example: In below image we have selected Chennai in Asia region.

![VM Creation Image 3](/assets/IBMCloud/VM3.png)

6. Select the profile of virtual machine.

![VM Creation Image 4](/assets/IBMCloud/VM4.png)

7. Select the operating system and version.

![VM Creation Image 5](/assets/IBMCloud/VM5.png)

8. Select network interface according to use.

![VM Creation Image 6](/assets/IBMCloud/VM6.png)

9. Select the security group.

![VM Creation Image 7](/assets/IBMCloud/VM7.png)

10. Leave rest of the things could be default. Click on the "Create" button.

![VM Creation Image 8](/assets/IBMCloud/VM8.png)

11. Check created VM in "Navigation Menu" -> "Resource list" Devices

![VM Creation Image 9](/assets/IBMCloud/VM9.png)

![VM Creation Image 10](/assets/IBMCloud/VM10.png)

12. Check the detail of VM in overview

![VM Creation Image 11](/assets/IBMCloud/VM11.png)

13. Check the devices list, and click on the menu option on the same page.

![VM Creation Image 12](/assets/IBMCloud/VM12.png)

## Step 2: Create Kubernetes Cluster on IBM

1. Search for the Kubernetes services

![K8S Creation Image 1](/assets/IBMCloud/k8s1.png)

2. Select the plan details to "Standard". Please note "Free" plan has the limited resources, which can not fulfill the Pulsar cluster requirement.

![K8S Creation Image 2](/assets/IBMCloud/k8s2.png)

3. Select the infrastructure type we are going with the classic and also select the Kubernetes version .

![K8S Creation Image 3](/assets/IBMCloud/k8s3.png)

4. Select location and resource group. Select single single zone or multi zone as per your need.

![K8S Creation Image 4](/assets/IBMCloud/k8s4.png)

![K8S Creation Image 5](/assets/IBMCloud/k8s5.png)

5. Select worker pool size and flavor (vCPU, Memory) of the worker.

![K8S Creation Image 6](/assets/IBMCloud/k8s6.png)

![K8S Creation Image 7](/assets/IBMCloud/k8s7.png)

6. Set cluster name as you want.

![K8S Creation Image 8](/assets/IBMCloud/k8s8.png)
7. Leave rest of the things as we are selecting as default. You can disable below options. Click on create and wait for provisioning of the cluster.

![K8S Creation Image 9](/assets/IBMCloud/k8s9.png)

8. After the cluster is successfully provisioned, connect to the cluster. In order to connect click on the "Action" button then click on "Connect via CLI", it will give you commands, copy that and run in your VM so that we can communicate to cluster through VM. We have to configure VM for communicating to cluster in the next steps will describe how to configure VM for that.

![K8S Creation Image 10](/assets/IBMCloud/k8s10.png)

9. Check the created cluster list by clicking on the clusters options.

![K8S Creation Image 11](/assets/IBMCloud/k8s11.png)

10. It will show you the list of all the created clusters.

![K8S Creation Image 12](/assets/IBMCloud/k8s12.png)

## Step 3: Prepare VM for connecting to Kubernetes cluster and deploy Pulsar Helm chart on Kubernetes cluster.

**Prerequisites**
1. Install [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli) and connect to Kubernetes master node.

2. Install [IBM Cloud CLI Plugins](https://cloud.ibm.com/docs/containers?topic=containers-cs_cli_install) to connect to IKS (IBM Kubernetes services). This is a required step.

3. Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) 1.23 or later versions.
4. Install [Helm](https://helm.sh/docs/intro/install/).

:::note

Please install all the above things before running the below commands

:::

1. First take SSH of your VM with your private key. Run all the below commands one by one.
```bash
   $ ibmcloud login
   $ ibmcloud plugin list
```

Output
![Output of Command img IBMLogin](/assets/IBMCloud/IBMLogin.png)

2. For connection to the Kubernetes cluster, you will get a command in the Kubernetes cluster section (Kubernetes console) as below.


```bash
    $ibmcloud ks cluster config --cluster ccql163t064kpvg5gg10
```

:::note

This step is showing during creation of Kubernetes Cluster.

:::

![K8S Creation Image 11](/assets/IBMCloud/k8s11.png)

3. After running the second and third commands shown in the above images, you will get an output as below. You do not need to run the first command because you've already logged in to IBM Cloud.

Output
![Output of Command IKSConnect](/assets/IBMCloud/IKSConnect.png)

> Now we are able to run commands of kubectl.

## Step 4: Verify the deployment
Make sure all the pods of Pulsar are running. Get the service URL and broker URL for publishing and consuming the messages.



> [Installation of Pulsar helm in minikube cluster](https://pulsar.apache.org/docs/getting-started-helm/)  this document is for minikube cluster we are taking reference from that.

1. Add Pulsar chart repo

```bash
$ helm repo add apache https://pulsar.apache.org/charts
$ helm repo update
$ helm repo list
```

Output
![Output of Command Helmrepo](/assets/IBMCloud/Helmrepo.png)

2. Clone the Pulsar Helm chart repository, go inside the pulsar-helm-chart directory

```bash
git clone https://github.com/apache/pulsar-helm-chart
cd pulsar-helm-chart
```

3. Run the script `prepare_helm_release.sh` to create secrets required for installing the Apache Pulsar Helm chart. The username `pulsar` and password `pulsar` are used for logging into the Grafana dashboard and Pulsar Manager.

:::note

When running the script, you can use `-n` to specify the Kubernetes namespace where the Pulsar Helm chart is installed,`-k`to define the Pulsar Helm release name, and `-c` to create the Kubernetes namespace. For more information about the script, run `./scripts/pulsar/prepare_helm_release.sh --help`.

:::

```bash
 ./scripts/pulsar/prepare_helm_release.sh -n default -k asia -c
```

Output
![Output of Command HelmOutPut](/assets/IBMCloud/HelmOutPut.png)

4. Use the Pulsar Helm chart to install a Pulsar cluster to Kubernetes.

```bash
helm install --values examples/values-minikube.yaml --set initialize=true asia apache/pulsar
```

:::note

You need to specify `--set initialize=true` when installing Pulsar the first time. This command installs and starts Apache Pulsar.

:::

Output
![Output of Command HelmInstall](/assets/IBMCloud/HelmInstall.png)

5. Check the status of all pods.

```bash
kubectl get pods
```
If all pods start up successfully, you can see that `STATUS` is changed to `Running` or `Completed`.

Output

![Output of Command PodStatus](/assets/IBMCloud/PodStatus.png)

6. Check the status of all services.

```bash
 kubectl get services
```

Output

![Output of Command Services](/assets/IBMCloud/Services.png)

The output shows both `services URL` and `broker URL`.
Proxy external IPs are the ports changed just now:
- Service URL port is 80.
- Broker URL port is 6650. This is default.
If you execute all the commands successfully, you can use the Pulsar client to connect to  clusters and produce and consume messages through proxy external IPs.
