---
id: validate-release-candidate
title: Verifying release candidates
---

This page contains manual instructions for reviewing and verifying a release candidate.

## Validate the binary distribution

### Download And Verify the binary distributions

Download the server distribution `apache-pulsar-<release>-bin.tar.gz` and extract it. The extracted files are in a directory called `apache-pulsar-<release>`. All the operations below happen within that directory:

```shell
cd apache-pulsar-<release>
```

Check the bookkeeper libs are complied on Linux:

```shell
unzip -t ./lib/org.apache.bookkeeper-circe-checksum-*.jar | grep lib
unzip -t ./lib/org.apache.bookkeeper-cpu-affinity-*.jar | grep lib
```

The output should look like:

```shell
testing: lib/                     OK
testing: lib/libcirce-checksum.so   OK
testing: lib/                     OK
testing: lib/libcpu-affinity.so   OK
```

Download the Cassandra connector:

```shell
mkdir connectors
mv pulsar-io-cassandra-<release>.nar connectors
```

Download the `*.asc` file and verify the GPG signature:

```bash
gpg --verify apache-pulsar-<release>-bin.tar.gz.asc
```

### Download And Verify the source tarball

Before you start to validate the source tarball, make sure you have installed these software:

- JDK 17 (for Pulsar version >= 2.11) or JDK 11 (for earlier versions)
- Maven 3.8.6 or later

Download the source tarball and extract it. The extracted files are in a directory called `apache-pulsar-<release>-src`

```shell
cd apache-pulsar-<release>-src
mvn clean install -DskipTests
```

### Validate Pub/Sub and Java Functions

#### Standalone service

Open a terminal to start a standalone service:

```shell
PULSAR_STANDALONE_USE_ZOOKEEPER=1 bin/pulsar standalone
```

When you start a standalone cluster, there are a few things to check.

1. The standalone cluster is able to locate all the connectors. The following logging information should be displayed.

```text
Found connector ConnectorDefinition(name=kinesis, description=Kinesis sink connector, sourceClass=null, sinkClass=org.apache.pulsar.io.kinesis.KinesisSink) from /Users/sijie/tmp/apache-pulsar-2.1.0-incubating/./connectors/pulsar-io-kinesis-2.1.0-incubating.nar
...
Found connector ConnectorDefinition(name=cassandra, description=Writes data into Cassandra, sourceClass=null, sinkClass=org.apache.pulsar.io.cassandra.CassandraStringSink) from /Users/sijie/tmp/apache-pulsar-2.1.0-incubating/./connectors/pulsar-io-cassandra-2.1.0-incubating.nar
...
Found connector ConnectorDefinition(name=aerospike, description=Aerospike database sink, sourceClass=null, sinkClass=org.apache.pulsar.io.aerospike.AerospikeStringSink) from /Users/sijie/tmp/apache-pulsar-2.1.0-incubating/./connectors/pulsar-io-aerospike-2.1.0-incubating.nar
```

2. (since Pulsar 2.1 release) The standalone starts bookkeeper table service. The output is similar as follows:

```text
12:12:26.099 [main] INFO  org.apache.pulsar.zookeeper.LocalBookkeeperEnsemble - 'default' namespace for table service : namespace_name: "default"
default_stream_conf {
  key_type: HASH
  min_num_ranges: 24
  initial_num_ranges: 24
  split_policy {
    fixed_range_policy {
      num_ranges: 2
    }
  }
  rolling_policy {
    size_policy {
      max_segment_size: 134217728
    }
  }
  retention_policy {
    time_policy {
      retention_minutes: -1
    }
  }
}
```

3. Functions worker is started correctly. The output is similar as follows:

```text
14:28:24.101 [main] INFO  org.apache.pulsar.functions.worker.WorkerService - Starting worker c-standalone-fw-localhost-8080...
14:28:24.907 [main] INFO  org.apache.pulsar.functions.worker.WorkerService - Worker Configs: {
  "workerId" : "c-standalone-fw-localhost-8080",
  "workerHostname" : "localhost",
  "workerPort" : 8080,
  "workerPortTls" : 6751,
  "jvmGCMetricsLoggerClassName" : null,
  "numHttpServerThreads" : 8,
  "connectorsDirectory" : "./connectors",
  "functionMetadataTopicName" : "metadata",
  "functionWebServiceUrl" : null,
  "pulsarServiceUrl" : "pulsar://127.0.0.1:6650",
  "pulsarWebServiceUrl" : "http://127.0.0.1:8080",
  "clusterCoordinationTopicName" : "coordinate",
  "pulsarFunctionsNamespace" : "public/functions",
  "pulsarFunctionsCluster" : "standalone",
  "numFunctionPackageReplicas" : 1,
  "downloadDirectory" : "/tmp/pulsar_functions",
  "stateStorageServiceUrl" : "bk://127.0.0.1:4181",
  "functionAssignmentTopicName" : "assignments",
  "schedulerClassName" : "org.apache.pulsar.functions.worker.scheduler.RoundRobinScheduler",
  "failureCheckFreqMs" : 30000,
  "rescheduleTimeoutMs" : 60000,
  "initialBrokerReconnectMaxRetries" : 60,
  "assignmentWriteMaxRetries" : 60,
  "instanceLivenessCheckFreqMs" : 30000,
  "clientAuthenticationPlugin" : null,
  "clientAuthenticationParameters" : null,
  "topicCompactionFrequencySec" : 1800,
  "tlsEnabled" : true,
  "tlsCertificateFilePath" : null,
  "tlsKeyFilePath" : null,
  "tlsTrustCertsFilePath" : null,
  "tlsAllowInsecureConnection" : false,
  "tlsRequireTrustedClientCertOnConnect" : false,
  "useTls" : false,
  "tlsHostnameVerificationEnable" : false,
  "authenticationEnabled" : false,
  "authenticationProviders" : null,
  "authorizationEnabled" : false,
  "superUserRoles" : null,
  "properties" : { },
  "threadContainerFactory" : null,
  "processContainerFactory" : {
    "javaInstanceJarLocation" : null,
    "pythonInstanceLocation" : null,
    "logDirectory" : null,
    "extraFunctionDependenciesDir" : null
  },
  "kubernetesContainerFactory" : null,
  "secretsProviderConfiguratorClassName" : null,
  "secretsProviderConfiguratorConfig" : null,
  "functionInstanceMinResources" : null,
  "workerWebAddress" : "http://localhost:8080",
  "functionMetadataTopic" : "persistent://public/functions/metadata",
  "clusterCoordinationTopic" : "persistent://public/functions/coordinate",
  "functionAssignmentTopic" : "persistent://public/functions/assignments"
}
```

4. Do sanity check before moving to the next step.

```shell
# check pulsar binary port is listened correctly
netstat -an | grep 6650 | grep LISTEN

# check function cluster
curl -s http://localhost:8080/admin/v2/worker/cluster
# example output:
# [{"workerId":"c-standalone-fw-localhost-6750","workerHostname":"localhost","port":6750}]

# check brokers
curl -s http://localhost:8080/admin/v2/namespaces/public
# example outoupt:
# ["public/default","public/functions"]

# check connectors
curl -s http://localhost:8080/admin/v2/functions/connectors
# example output:
# [{"name":"aerospike","description":"Aerospike database sink","sinkClass":"org.apache.pulsar.io.aerospike.AerospikeStringSink"},{"name":"cassandra","description":"Writes data into Cassandra","sinkClass":"org.apache.pulsar.io.cassandra.CassandraStringSink"},{"name":"kafka","description":"Kafka source and sink connector","sourceClass":"org.apache.pulsar.io.kafka.KafkaStringSource","sinkClass":"org.apache.pulsar.io.kafka.KafkaStringSink"},{"name":"kinesis","description":"Kinesis sink connector","sinkClass":"org.apache.pulsar.io.kinesis.KinesisSink"},{"name":"rabbitmq","description":"RabbitMQ source connector","sourceClass":"org.apache.pulsar.io.rabbitmq.RabbitMQSource"},{"name":"twitter","description":"Ingest data from Twitter firehose","sourceClass":"org.apache.pulsar.io.twitter.TwitterFireHose"}]

# check table services (Skip this step on 2.11.x or later)
nc -vz4 localhost 4181
```

#### Functions

Open another terminal to submit a Java Exclamation function.

1. Create tenant and namespace:

```shell
bin/pulsar-admin tenants create test
bin/pulsar-admin namespaces create test/test-namespace
```

2. Create function.

```shell
bin/pulsar-admin functions create --function-config-file examples/example-function-config.yaml --jar examples/api-examples.jar
```

The following information is returned: `Created Successfully`.

3. At the same terminal as step 2, retrieve the function configuration.

```shell
bin/pulsar-admin functions get --tenant test --namespace test-namespace --name example
```

The output is similar as follows:

```json
{
  "tenant": "test",
  "namespace": "test-namespace",
  "name": "example",
  "className": "org.apache.pulsar.functions.api.examples.ExclamationFunction",
  "userConfig": "{\"PublishTopic\":\"test_result\"}",
  "autoAck": true,
  "parallelism": 1,
  "source": {
    "topicsToSerDeClassName": {
      "test_src": ""
    },
    "typeClassName": "java.lang.String"
  },
  "sink": {
    "topic": "test_result",
    "typeClassName": "java.lang.String"
  },
  "resources": {}
}
```

4. At the same terminal as step 3, retrieve the function status.

```shell
bin/pulsar-admin functions status --tenant test --namespace test-namespace --name example
```

The output is similar as follows:

```json
{
  "numInstances" : 1,
  "numRunning" : 1,
  "instances" : [ {
    "instanceId" : 0,
    "status" : {
      "running" : true,
      "error" : "",
      "numRestarts" : 0,
      "numReceived" : 0,
      "numSuccessfullyProcessed" : 0,
      "numUserExceptions" : 0,
      "latestUserExceptions" : [ ],
      "numSystemExceptions" : 0,
      "latestSystemExceptions" : [ ],
      "averageLatency" : 0.0,
      "lastInvocationTime" : 0,
      "workerId" : "c-standalone-fw-localhost-8080"
    }
  } ]
}
```

5. At the same terminal as step 4, subscribe the output topic `test_result`.

```shell
bin/pulsar-client consume -s test-sub -n 0 test_result
```

6. Open a new terminal to produce messages into the input topic `test_src`.

```shell
bin/pulsar-client produce -m "test-messages-`date`" -n 10 test_src
```

7. At the terminal of step 5, the messages produced by the Exclamation function is returned. The output is similar as follows:

```text
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
----- got message -----
test-messages-Thu Jul 19 11:59:15 PDT 2018!
```

### Validate Connectors

:::note

Make sure you have docker available at your laptop. If you haven't installed docker, you can skip this section.

:::

1. Set up a cassandra cluster.

```shell
docker run -d --rm  --name=cassandra -p 9042:9042 cassandra:3.11
```

Make sure that the cassandra cluster is running.

```shell
# run docker ps to find the docker process for cassandra
docker ps
```

```shell
# check if the cassandra is running as expected
docker logs cassandra
```

```shell
# check the cluster status
docker exec cassandra nodetool status

# Datacenter: datacenter1
# =======================
# Status=Up/Down
# |/ State=Normal/Leaving/Joining/Moving
# --  Address     Load       Tokens       Owns (effective)  Host ID                               Rack
# UN  172.17.0.2  103.67 KiB  256          100.0%            af0e4b2f-84e0-4f0b-bb14-bd5f9070ff26  rack1
```

2. Create keyspace and table.

Run `cqlsh`:

```shell
docker exec -ti cassandra cqlsh localhost
```

In the cqlsh, create the `pulsar_test_keyspace` keyspace and the `pulsar_test_table` table.

```text
cqlsh> CREATE KEYSPACE pulsar_test_keyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};
cqlsh> USE pulsar_test_keyspace;
cqlsh:pulsar_test_keyspace> CREATE TABLE pulsar_test_table (key text PRIMARY KEY, col text);
cqlsh:pulsar_test_keyspace> exit
```

3. Prepare a cassandra sink yaml file and put it under examples directory as `cassandra-sink.yml`.

```shell
vim examples/cassandra-sink.yml
```

The content should be:

```yaml
configs:
    roots: "localhost:9042"
    keyspace: "pulsar_test_keyspace"
    columnFamily: "pulsar_test_table"
    keyname: "key"
    columnName: "col"
```

4. Submit a cassandra sink.

```shell
bin/pulsar-admin sink create --tenant public --namespace default --name cassandra-test-sink --sink-type cassandra --sink-config-file examples/cassandra-sink.yml --inputs test_cassandra
# "Created successfully"
```

Get the sink info:

```shell
bin/pulsar-admin sink get --tenant public --namespace default --name cassandra-test-sink
```

The output is similar as follows:

```json
{
  "tenant": "public",
  "namespace": "default",
  "name": "cassandra-test-sink",
  "className": "org.apache.pulsar.io.cassandra.CassandraStringSink",
  "inputSpecs": {
    "test_cassandra": {
      "isRegexPattern": false
    }
  },
  "configs": {
    "roots": "localhost:9042",
    "keyspace": "pulsar_test_keyspace",
    "columnFamily": "pulsar_test_table",
    "keyname": "key",
    "columnName": "col"
  },
  "parallelism": 1,
  "processingGuarantees": "ATLEAST_ONCE",
  "retainOrdering": false,
  "autoAck": true,
  "archive": "builtin://cassandra"
}
```

Get the running status:

```shell
bin/pulsar-admin sink status --tenant public --namespace default --name cassandra-test-sink
```

The output is similar as follows:

```json
{
  "numInstances" : 1,
  "numRunning" : 1,
  "instances" : [ {
    "instanceId" : 0,
    "status" : {
      "running" : true,
      "error" : "",
      "numRestarts" : 0,
      "numReadFromPulsar" : 0,
      "numSystemExceptions" : 0,
      "latestSystemExceptions" : [ ],
      "numSinkExceptions" : 0,
      "latestSinkExceptions" : [ ],
      "numWrittenToSink" : 0,
      "lastReceivedTime" : 0,
      "workerId" : "c-standalone-fw-localhost-8080"
    }
  } ]
}
```

5. Produce messages to the source topic.

```shell
for i in {0..10}; do bin/pulsar-client produce -m "key-$i" -n 1 test_cassandra; done
```

6. Check the sink status, and 11 messages are processed.

```shell
bin/pulsar-admin sink status --tenant public --namespace default --name cassandra-test-sink
```

The output is similar as follows:

```json
{
  "numInstances" : 1,
  "numRunning" : 1,
  "instances" : [ {
    "instanceId" : 0,
    "status" : {
      "running" : true,
      "error" : "",
      "numRestarts" : 0,
      "numReadFromPulsar" : 11,
      "numSystemExceptions" : 0,
      "latestSystemExceptions" : [ ],
      "numSinkExceptions" : 0,
      "latestSinkExceptions" : [ ],
      "numWrittenToSink" : 11,
      "lastReceivedTime" : 1554833501277,
      "workerId" : "c-standalone-fw-localhost-8080"
    }
  } ]
}
```

7. Check results in cassandra.

```shell
docker exec -ti cassandra cqlsh localhost
```

In the cqlsh session:

```text
cqlsh> use pulsar_test_keyspace;
cqlsh:pulsar_test_keyspace> select * from pulsar_test_table;

 key    | col
--------+--------
  key-5 |  key-5
  key-0 |  key-0
  key-9 |  key-9
  key-2 |  key-2
  key-1 |  key-1
  key-3 |  key-3
  key-6 |  key-6
  key-7 |  key-7
  key-4 |  key-4
  key-8 |  key-8
 key-10 | key-10

(11 rows)
cqlsh:pulsar_test_keyspace> exit
```

8. Delete the sink.

```shell
bin/pulsar-admin sink delete --tenant public --namespace default --name cassandra-test-sink
# "Deleted successfully"
```

9. Stop the Cassandra container

```shell
docker stop cassandra
```

### Validate Stateful Functions

Since Pulsar 2.1 release, Pulsar enables bookkeeper table service for stateful Pulsar functions (as a developer preview).

The following are instructions to validate counter functions.

1. Create a wordcount function.

```shell
bin/pulsar-admin functions create --function-config-file examples/example-function-config.yaml --jar examples/api-examples.jar --name word_count --className org.apache.pulsar.functions.api.examples.WordCountFunction --inputs test_wordcount_src --output test_wordcount_dest
# "Created successfully"
```

2. Get function information and status.

```shell
bin/pulsar-admin functions get --tenant test --namespace test-namespace --name word_count
```

The output is similar as follows:

```json
{
  "tenant": "test",
  "namespace": "test-namespace",
  "name": "word_count",
  "className": "org.apache.pulsar.functions.api.examples.WordCountFunction",
  "inputSpecs": {
    "test_wordcount_src": {
      "isRegexPattern": false
    }
  },
  "output": "test_wordcount_dest",
  "processingGuarantees": "ATLEAST_ONCE",
  "retainOrdering": false,
  "userConfig": {
    "PublishTopic": "test_result"
  },
  "runtime": "JAVA",
  "autoAck": true,
  "parallelism": 1,
  "resources": {
    "cpu": 1.0,
    "ram": 1073741824,
    "disk": 10737418240
  },
  "cleanupSubscription": true
}
```

```shell
bin/pulsar-admin functions status --tenant test --namespace test-namespace --name word_count
```

The output is similar as follows:

```json
{
  "numInstances" : 1,
  "numRunning" : 1,
  "instances" : [ {
    "instanceId" : 0,
    "status" : {
      "running" : true,
      "error" : "",
      "numRestarts" : 0,
      "numReceived" : 0,
      "numSuccessfullyProcessed" : 0,
      "numUserExceptions" : 0,
      "latestUserExceptions" : [ ],
      "numSystemExceptions" : 0,
      "latestSystemExceptions" : [ ],
      "averageLatency" : 0.0,
      "lastInvocationTime" : 0,
      "workerId" : "c-standalone-fw-localhost-8080"
    }
  } ]
}
```

3. Query the state table for the function: watching on a key called "hello"

```shell
bin/pulsar-admin functions querystate --tenant test --namespace test-namespace --name word_count -k hello -w
# key 'hello' doesn't exist.
# key 'hello' doesn't exist.
# key 'hello' doesn't exist
```

4. Produce the messages to source topic `test_wordcount_src`.

Produce 10 messages "hello" to the `test_wordcount_src` topic. The value of "hello" is updated to 10.

```shell
bin/pulsar-client produce -m "hello" -n 10 test_wordcount_src
```

Checkout the result in the terminal of step 3.

```json
{
  "key": "hello",
  "numberValue": 10,
  "version": 9
}
```

Produce another 10 messages "hello". The result is updated to 20.

```bash
bin/pulsar-client produce -m "hello" -n 10 test_wordcount_src
```

The result in the terminal of step 3 is updated to `20`.

```text
  "key": "hello",
  "numberValue": 20,
  "version": 19
```
