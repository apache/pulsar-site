---
id: pulsar-manager
title: Pulsar Manager Release Notes
sidebar_label: Pulsar Manager Release Notes
---

## 0.4.0 &mdash; 2023-05-09 <a id="0.4.0"></a>

#### What's Changed

* Update stale description of creating environment in README by @maxsxu in [PR-462](https://github.com/apache/pulsar-manager/pull/462)
* feat:upgrade version to 0.3.0 by @urfreespace in [PR-458](https://github.com/apache/pulsar-manager/pull/458)
* Move version to 0.3.0 by @urfreespace in [PR-455](https://github.com/apache/pulsar-manager/pull/455)
* Align BouncyCastle transitive dependecies to 1.68 by @nicoloboschi in [PR-466](https://github.com/apache/pulsar-manager/pull/466)
* Fix URL for example in README.md by @corymacd in [PR-475](https://github.com/apache/pulsar-manager/pull/475)
* Removing conflicting dependencies by @gurleen-gks in [PR-482](https://github.com/apache/pulsar-manager/pull/482)
* Removing transitive dependencies for log4j by @gurleen-gks in [PR-488](https://github.com/apache/pulsar-manager/pull/488)
* Redirect notifications to the commits@ list instead of dev by @merlimat in [PR-490](https://github.com/apache/pulsar-manager/pull/490)
* For #492, Remove unused 'token' by @Hongten in [PR-493](https://github.com/apache/pulsar-manager/pull/493)
* Use correct path for initdb and pg_ctl by @mzwennes in [PR-478](https://github.com/apache/pulsar-manager/pull/478)
* Update support for casdoor  by @jakiuncle in [PR-484](https://github.com/apache/pulsar-manager/pull/484)
* [improve][doc] Add casdoor document for administration-pulsar-manager by @jakiuncle in [PR-499](https://github.com/apache/pulsar-manager/pull/499)
* Fix create topic failure for non-partitioned topic by @Apurva007 in [PR-504](https://github.com/apache/pulsar-manager/pull/504)
* Fix 307 redirect errors when connecting to multi-broker cluster by @Apurva007 in [PR-503](https://github.com/apache/pulsar-manager/pull/503)
* Use existing database if present by @vfauth in [PR-501](https://github.com/apache/pulsar-manager/pull/501)
* Upgrade Gradle and Gralde Node Plugin to fix build issues by @tisonkun in [PR-510](https://github.com/apache/pulsar-manager/pull/510)
* Fix GHA workflow syntax by @tisonkun in [PR-511](https://github.com/apache/pulsar-manager/pull/511)
* build: upgrade deps for building on modern machine by @tisonkun in [PR-513](https://github.com/apache/pulsar-manager/pull/513)

#### New Contributors

* @maxsxu made their first contribution in [PR-462](https://github.com/apache/pulsar-manager/pull/462)
* @nicoloboschi made their first contribution in [PR-466](https://github.com/apache/pulsar-manager/pull/466)
* @corymacd made their first contribution in [PR-475](https://github.com/apache/pulsar-manager/pull/475)
* @gurleen-gks made their first contribution in [PR-482](https://github.com/apache/pulsar-manager/pull/482)
* @merlimat made their first contribution in [PR-490](https://github.com/apache/pulsar-manager/pull/490)
* @Hongten made their first contribution in [PR-493](https://github.com/apache/pulsar-manager/pull/493)
* @mzwennes made their first contribution in [PR-478](https://github.com/apache/pulsar-manager/pull/478)
* @jakiuncle made their first contribution in [PR-484](https://github.com/apache/pulsar-manager/pull/484)
* @Apurva007 made their first contribution in [PR-504](https://github.com/apache/pulsar-manager/pull/504)
* @vfauth made their first contribution in [PR-501](https://github.com/apache/pulsar-manager/pull/501)

**Full Changelog**: https://github.com/apache/pulsar-manager/compare/v0.3.0...v0.4.0

## 0.3.0 &mdash; 2022-05-25 <a id="0.3.0"></a>

* Fix MySQL schema field token error [PR-339](https://github.com/apache/pulsar-manager/pull/339)
* Fix the bugs in topics list page and search topics [PR-342](https://github.com/apache/pulsar-manager/pull/342)
* Fix the issue of Swagger does not work [PR-369](https://github.com/apache/pulsar-manager/pull/369)
* Add offload threshold input [PR-375](https://github.com/apache/pulsar-manager/pull/375)
* Add dashboard service for aggregated information collection [PR-326](https://github.com/apache/pulsar-manager/pull/326)
* Add multi bookie cluster support [PR-388](https://github.com/apache/pulsar-manager/pull/388)
* Fix the bug that admin roles cannot be deleted [PR-397](https://github.com/apache/pulsar-manager/pull/397)
* Add Filtering support for tenant/namespace/topic [PR-440](https://github.com/apache/pulsar-manager/pull/440)
* Fix Log4J security vulnerabilities [PR-438](https://github.com/apache/pulsar-manager/pull/438)
* Allow user to assign tenant as resource to role [PR-436](https://github.com/apache/pulsar-manager/pull/436)
* Add support for Casdoor [PR-446](https://github.com/apache/pulsar-manager/pull/446)
* Fix unload namespace error [PR-386](https://github.com/apache/pulsar-manager/pull/386)

## 0.2.0 &mdash; 2020-09-28 <a id="0.2.0"></a>

* Support multiple addresses for the broker stats [PR-306](https://github.com/apache/pulsar-manager/pull/306).
* Use `PulsarAdmin` instead of `HttpUti`l in `BrokerStatsServiceImpl` [PR-315](https://github.com/apache/pulsar-manager/pull/315).
* Serve frontend directly from Pulsar Manager backend process [PR-288](https://github.com/apache/pulsar-manager/pull/288).
* Support docker for JWT [PR-218](https://github.com/apache/pulsar-manager/pull/218).
* Support sub and unsub operations [PR-240](https://github.com/apache/pulsar-manager/pull/240).
* Support peeking messages from the Pulsar broker [PR-241](https://github.com/apache/pulsar-manager/pull/241).
* Support BookKeeper visual manager 1.2.0 [PR-300](https://github.com/apache/pulsar-manager/pull/300).
* Support forwarding messages through HTTPS [PR-258](https://github.com/apache/pulsar-manager/pull/258).
* Support displaying stats for tenants and namespaces [PR-243](https://github.com/apache/pulsar-manager/pull/243).
* Add a configuration file for the backend service of Pulsar manager [PR-236](https://github.com/apache/pulsar-manager/pull/236).
* Add default configurations for the environment [PR-242](https://github.com/apache/pulsar-manager/pull/242).
* Fixe an SQL syntax error [PR-298](https://github.com/apache/pulsar-manager/pull/298).
* Fix the issue that Pulsar Manager fail to process the request sent to the Pulsar proxy [PR-281](https://github.com/apache/pulsar-manager/pull/281).
* Change the default port and replace the request URI [PR-316](https://github.com/apache/pulsar-manager/pull/316).


## 0.1.0 &mdash; 2019-11-25 <a id="0.1.0"></a>

* Remove streamnative from the project [PR-213](https://github.com/apache/pulsar-manager/pull/213).
* Add license file for pulsar-manager [PR-209](https://github.com/apache/pulsar-manager/pull/209).
* Support management of jwt for pulsar-manager [PR-205](https://github.com/apache/pulsar-manager/pull/205).
* Support redirect.scheme [PR-204](https://github.com/apache/pulsar-manager/pull/204).
* Fix reset cursor by time [PR-179](https://github.com/apache/pulsar-manager/pull/179).
* Fix wrong broker display error [PR-187](https://github.com/apache/pulsar-manager/pull/187).
* Remove dependency package jszip [PR-189](https://github.com/apache/pulsar-manager/pull/189).
* Add developer guide [PR-186](https://github.com/apache/pulsar-manager/pull/186).
* Keep table and column name fields lowercase [PR-190](https://github.com/apache/pulsar-manager/pull/190).
* Fix loggin level [PR-191](https://github.com/apache/pulsar-manager/pull/191).
* Fix wrong place for license scan badge [PR-193](https://github.com/apache/pulsar-manager/pull/193).
* Add support for HerdDB database [PR-183](https://github.com/apache/pulsar-manager/pull/183).
* Make default environment persistent [PR-197](https://github.com/apache/pulsar-manager/pull/197).
