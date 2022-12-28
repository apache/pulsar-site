# Security

## Security advisories

### 2022

* 2022-01-31 [CVE-2021-41571](CVE-2021-41571.md) Pulsar Admin API allows access to data from other tenants using getMessageById API
* 2022-09-22 [CVE-2022-24280](CVE-2022-24280.md) Apache Pulsar Proxy target broker address isn't validated
* 2022-09-22 [CVE-2022-33681](CVE-2022-33681.md) Improper Hostname Verification in Java Client and Proxy can expose authentication data via MITM
* 2022-09-22 [CVE-2022-33682](CVE-2022-33682.md) Disabled Hostname Verification makes Brokers, Proxies vulnerable to MITM attack
* 2022-09-22 [CVE-2022-33683](CVE-2022-33683.md) Disabled Certificate Validation makes Broker, Proxy Admin Clients vulnerable to MITM attack
* 2022-11-03 [CVE-2022-33684](CVE-2022-33684.md) Apache Pulsar C++/Python OAuth Clients prior to 3.0.0 were vulnerable to an MITM attack due to Disabled Certificate Validation

### 2021

* 2021-05-25 [CVE-2021-22160](CVE-2021-22160.md) Authentication with JWT allows use of "none"-algorithm

## Security Policy

The Pulsar community follows the ASF [security vulnerability handling process](https://apache.org/security/#vulnerability-handling).

To report a new vulnerability you have discovered, please follow the [ASF security vulnerability reporting process](https://apache.org/security/#reporting-a-vulnerability). To report a vulnerability for Pulsar, contact the [Apache Security Team](https://www.apache.org/security/). When reporting a vulnerability to [security@apache.org](mailto:security@apache.org), you can copy your email to [private@pulsar.apache.org](mailto:private@pulsar.apache.org) to send your report to the Apache Pulsar Project Management Committee. This is a private mailing list.

It is the responsibility of the security vulnerability handling project team (Apache Pulsar PMC in most cases) to make public security vulnerability announcements. You can follow announcements on the [users@pulsar.apache.org](mailto:users@pulsar.apache.org) mailing list. For instructions on how to subscribe, please see https://pulsar.apache.org/contact/.
