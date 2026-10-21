# Security

## Security Policy

The Pulsar community follows the ASF [security vulnerability handling process](https://apache.org/security/#vulnerability-handling).

To report a new vulnerability you have discovered, please follow the [ASF security vulnerability reporting process](https://apache.org/security/#reporting-a-vulnerability). To report a vulnerability for Pulsar, contact the [Apache Security Team](https://www.apache.org/security/). When reporting a vulnerability to [security@apache.org](mailto:security@apache.org), you can copy your email to [private@pulsar.apache.org](mailto:private@pulsar.apache.org) to send your report to the Apache Pulsar Project Management Committee. This is a private mailing list.

It is the responsibility of the security vulnerability handling project team (Apache Pulsar PMC in most cases) to make public security vulnerability announcements. You can follow announcements on the [users@pulsar.apache.org mailing list](https://lists.apache.org/list.html?users@pulsar.apache.org). For instructions on how to subscribe, please see https://pulsar.apache.org/contact/.

## Security advisories

Please subscribe to the [users@pulsar.apache.org mailing list](https://lists.apache.org/list.html?users@pulsar.apache.org) to receive Apache Pulsar security advisories when they are published.
For instructions on how to subscribe, please see https://pulsar.apache.org/contact/.

### 2026

* 2026-10-21 [CVE-2026-105869](CVE-2026-105869.md) Apache Pulsar: MultiRolesTokenAuthorizationProvider uses roles from unverified tokens for HTTP requests that fall back to the anonymous user role (🔴 severity: critical / 9.2)
* 2026-10-21 [CVE-2026-105944](CVE-2026-105944.md) Apache Pulsar Manager: Missing authentication and authorization and disclosure of the Pulsar admin credential; end of life (🔴 severity: critical / 10.0)
* 2026-10-21 [CVE-2026-105934](CVE-2026-105934.md) Apache Pulsar: Missing tenant admin authorization check when truncating a partitioned topic (🟠 severity: high / 7.2)
* 2026-10-21 [CVE-2026-105937](CVE-2026-105937.md) Apache Pulsar: Missing authorization of the shadow topic source allows cross-tenant message disclosure and deletion of source topic data (🟠 severity: high / 8.7)
* 2026-10-21 [CVE-2026-105942](CVE-2026-105942.md) Apache Pulsar: Original principal of proxied requests authorized with the proxy's authentication data, allowing privilege escalation (🟠 severity: high / 7.7)
* 2026-10-21 [CVE-2026-105945](CVE-2026-105945.md) Apache Pulsar: Improper Validation of Package Name Components Allows Cross-Tenant Package Access in Filesystem Package Storage (🟠 severity: high / 7.7)
* 2026-10-21 [CVE-2026-105926](CVE-2026-105926.md) Apache Pulsar: Missing Topic Authorization on Binary Protocol GetSchema and GetOrCreateSchema Commands (🟡 severity: medium / 5.3)
* 2026-10-21 [CVE-2026-105930](CVE-2026-105930.md) Apache Pulsar: Improper Authorization of Function, Source and Sink Package URLs Allows Cross-Tenant Package Download (🟡 severity: medium / 6.0)
* 2026-10-21 [CVE-2026-105935](CVE-2026-105935.md) Apache Pulsar: Function trigger publishes to the input topic without checking the caller's produce permission (🟡 severity: medium / 4.9)
* 2026-10-21 [CVE-2026-105936](CVE-2026-105936.md) Apache Pulsar: Functions connectors list endpoint does not apply the super-user check of the worker connectors endpoint (🟡 severity: medium / 5.3)
* 2026-10-21 [CVE-2026-105927](CVE-2026-105927.md) Apache Pulsar: Improper authorization of WebSocket consumer dead letter topic allows writes without PRODUCE permission (🟢 severity: low / 2.3)
* 2026-10-21 [CVE-2026-105931](CVE-2026-105931.md) Apache Pulsar: Missing authorization on transaction admin endpoints exposes transaction coordinator and transaction statistics of other tenants (🟢 severity: low / 2.3)
* 2026-10-21 [CVE-2026-105932](CVE-2026-105932.md) Apache Pulsar: Missing topic policy authorization on non-persistent topic entry filter endpoints (🟢 severity: low / 2.3)
* 2026-10-21 [CVE-2026-105933](CVE-2026-105933.md) Apache Pulsar: Namespace encryption requirement not enforced after a failure during topic initialization (🟢 severity: low / 2.3)
* 2026-10-21 [CVE-2026-105938](CVE-2026-105938.md) Apache Pulsar: Subscription authorization policies not enforced by namespace-level backlog and unsubscribe operations and by topic expire-all (🟢 severity: low / 2.3)

### 2025

* 2024-04-09 [CVE-2025-30677](CVE-2025-30677.md) Apache Pulsar IO Kafka Connector, Apache Pulsar IO Kafka Connect Adaptor: Sensitive information logged in Pulsar's Apache Kafka Connectors

### 2024

* 2024-10-04 [Apache Pulsar 3.3.2 released with important security fix for CVE-2024-47561](https://lists.apache.org/thread/o7xg4odt1ms1g46f3mjn39bw5kq3hks0)
* 2024-10-04 [Apache Pulsar 3.0.7 released with important security fix for CVE-2024-47561](https://lists.apache.org/thread/8ogktnsjns3r9oq1gfwkp0xnmph0qm0m)
* 2024-10-04 [Expediting Pulsar releases 3.0.7 and 3.3.2 due to critical RCE vulnerability in Avro Java SDK &lt;1.11.4, CVE-2024-47561](https://lists.apache.org/thread/ptb227lw8lljw5zv7z2qo2mx9xxoyl5c)
* 2024-04-02 [CVE-2024-29834](CVE-2024-29834.md) Improper Authorization For Namespace and Topic Management Endpoints
* 2024-03-12 [CVE-2022-34321](CVE-2022-34321.md) Improper Authentication for Pulsar Proxy Statistics Endpoint
* 2024-03-12 [CVE-2024-27135](CVE-2024-27135.md) Improper Input Validation in Pulsar Function Worker allows Remote Code Execution
* 2024-03-12 [CVE-2024-27317](CVE-2024-27317.md) Pulsar Functions Worker's Archive Extraction Vulnerability Allows Unauthorized File Modification
* 2024-03-12 [CVE-2024-27894](CVE-2024-27894.md) Pulsar Functions Worker Allows Unauthorized File Access and Unauthorized HTTP/HTTPS Proxying
* 2024-03-12 [CVE-2024-28098](CVE-2024-28098.md) Improper Authorization For Topic-Level Policy Management
* 2024-02-07 [CVE-2023-51437](CVE-2023-51437.md) Timing attack in SASL token signature verification

### 2023

* 2023-12-20 [CVE-2023-37544](CVE-2023-37544.md) Improper Authentication for WebSocket Proxy Endpoint Allows DoS
* 2023-07-13 [CVE-2023-31007](CVE-2023-31007.md) Broker does not always disconnect client when authentication data expires
* 2023-07-12 [CVE-2023-30428](CVE-2023-30428.md) Incorrect Authorization Validation for Rest Producer
* 2023-07-12 [CVE-2023-30429](CVE-2023-30429.md) Incorrect Authorization for Function Worker when using mTLS Authentication through Pulsar Proxy
* 2023-07-12 [CVE-2023-37579](CVE-2023-37579.md) Incorrect Authorization for Function Worker Can Leak Sink/Source Credentials

### 2022

* 2022-01-31 [CVE-2021-41571](CVE-2021-41571.md) Pulsar Admin API allows access to data from other tenants using getMessageById API
* 2022-09-22 [CVE-2022-24280](CVE-2022-24280.md) Apache Pulsar Proxy target broker address isn't validated
* 2022-09-22 [CVE-2022-33681](CVE-2022-33681.md) Improper Hostname Verification in Java Client and Proxy can expose authentication data via MITM
* 2022-09-22 [CVE-2022-33682](CVE-2022-33682.md) Disabled Hostname Verification makes Brokers, Proxies vulnerable to MITM attack
* 2022-09-22 [CVE-2022-33683](CVE-2022-33683.md) Disabled Certificate Validation makes Broker, Proxy Admin Clients vulnerable to MITM attack
* 2022-11-03 [CVE-2022-33684](CVE-2022-33684.md) Apache Pulsar C++/Python OAuth Clients prior to 3.0.0 were vulnerable to an MITM attack due to Disabled Certificate Validation

### 2021

* 2021-05-25 [CVE-2021-22160](CVE-2021-22160.md) Authentication with JWT allows use of "none"-algorithm