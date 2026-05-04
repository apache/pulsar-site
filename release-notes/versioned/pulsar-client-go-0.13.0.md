---
id: pulsar-client-go-0.13.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Important notice

- The avro schema codec has been changed from `github.com/linkedin/goavro/v2` to `github.com/hamba/avro/v2`.
- `pulsar.NewSchemaDefinition` has been removed. Use `pulsar.NewAvroSchema` instead.
- The client has dropped support for Go 1.18 and 1.19. The minimum supported version is now Go 1.20.

## What's Changed
* [chore] bump golang.org/x/net from 0.0.0-20220225172249-27dd8689420f to 0.17.0 by @BewareMyPower in https://github.com/apache/pulsar-client-go/pull/1155
* [fix] Fix DLQ producer name conflicts when multiple consumers send messages to DLQ by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1156
* [improve] Add 0.12.0 change log by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1153
* [fix] Fix SIGSEGV with zstd compression enabled by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1164
* [improve] Respect context cancellation in Producer's Flush by @jayshrivastava in https://github.com/apache/pulsar-client-go/pull/1165
* [chore] Add CodeQL static code scanner by @merlimat in https://github.com/apache/pulsar-client-go/pull/1169
* [fix] Fix BytesSchema by @petermnhull in https://github.com/apache/pulsar-client-go/pull/1173
* [feat] Support partitioned topic reader by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1178
* [fix] Fix available permits in MessageReceived by @panszobe in https://github.com/apache/pulsar-client-go/pull/1181
* [fix] Make function state values `omitempty` by @freeznet in https://github.com/apache/pulsar-client-go/pull/1185
* [fix] Fix Infinite Loop in Reader's `HasNext` Function by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1182
* [improve] Add optional parameters for getPartitionedStats by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1193
* [chore] Remove `VERSION` and `stable.txt` files by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1158
* [improve] getMessagesById gets all messages by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1194
* [improve] Change base image to apachepulsar/pulsar by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1195
* [improve] Add change log for 0.12.1 by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1189
* [fix] Change the wrong `SourceInstanceStatusData` in `SinkInstanceStatus` by @jiangpengcheng in https://github.com/apache/pulsar-client-go/pull/1199
* [chore] bump google.golang.org/protobuf from 1.30.0 to 1.33.0 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1198
* [improve] Add admin api HealthCheckWithTopicVersion by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1200
* [improve] Update topic admin interface comment, add topic admin test by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1202
* [fix] Build test container image using current hardware platform by @dragosvictor in https://github.com/apache/pulsar-client-go/pull/1205
* [improve] Expose RuntimeFlags for Pulsar Functions and Connectors by @freeznet in https://github.com/apache/pulsar-client-go/pull/1204
* [improve] Use physical address information in connection pool key by @dragosvictor in https://github.com/apache/pulsar-client-go/pull/1206
* [improve] Add a lint-docker command in makefile by @geniusjoe in https://github.com/apache/pulsar-client-go/pull/1207
* [improve] Add admin api GetLeaderBroker by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1203
* [chore] bump golang.org/x/net from 0.17.0 to 0.23.0 by @dependabot in https://github.com/apache/pulsar-client-go/pull/1209
* [improve] PIP-307: Use assigned broker URL hints during broker reconnection by @dragosvictor in https://github.com/apache/pulsar-client-go/pull/1208
* [improve] Add admin api GetListActiveBrokers by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1212
* [improve] Add admin api ForceDeleteSchema by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1213
* [improve] Upgrade golang-jwt to v5 by @nodece in https://github.com/apache/pulsar-client-go/pull/1214
* [improve] Supplement schema admin api by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1215
* [fix] Return an error when AckCumulative on a Shared/KeyShared subscription by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1217
* [cleanup] Remove AvroCodec from JSONSchema by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1216
* [fix] Reader Next returns on closed consumer by @Gilthoniel in https://github.com/apache/pulsar-client-go/pull/1219
* [improve] PIP-313 Support force unsubscribe using consumer api by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1220
* [improve] PIP-313 Add GetLastMessageIDs API by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1221
* [feat] PIP-188 Support blue-green migration by @heesung-sn in https://github.com/apache/pulsar-client-go/pull/1210
* [improve] Add admin topic api CreateWithProperties by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1226
* [fix] Fix dynamic config by @labuladong in https://github.com/apache/pulsar-client-go/pull/1228
* [feat] Support ZeroQueueConsumer by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1225
* [fix] Fix custom value with `/` by @labuladong in https://github.com/apache/pulsar-client-go/pull/1229
* [improve] Reuse function checkMsgIDPartition by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1232
* [refactor] Replace linkedin/goavro/v2 with hamba/avro/v2 by @adrianiacobghiula in https://github.com/apache/pulsar-client-go/pull/1230
* [fix] Fix the issue where the AckIDCumulativ cannot return error by @crossoverJie in https://github.com/apache/pulsar-client-go/pull/1235
* [feat] Add a slog wrapper of the logger interface by @ivan-penchev in https://github.com/apache/pulsar-client-go/pull/1234
* [fix] Fix the client crash when the transaction coordinator not found by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1241
* [improve] Return `ErrMaxConcurrentOpsReached` when too many concurrent ops in transaction coordinator client by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1242
* [fix] Fix transaction coordinator client cannot reconnect to the broker by @RobertIndie in https://github.com/apache/pulsar-client-go/pull/1237
* [fix] Fix producer connection by @nodece in https://github.com/apache/pulsar-client-go/pull/1243

## New Contributors
* @jayshrivastava made their first contribution in https://github.com/apache/pulsar-client-go/pull/1165
* @petermnhull made their first contribution in https://github.com/apache/pulsar-client-go/pull/1173
* @panszobe made their first contribution in https://github.com/apache/pulsar-client-go/pull/1181
* @dragosvictor made their first contribution in https://github.com/apache/pulsar-client-go/pull/1205
* @heesung-sn made their first contribution in https://github.com/apache/pulsar-client-go/pull/1210
* @adrianiacobghiula made their first contribution in https://github.com/apache/pulsar-client-go/pull/1230
* @ivan-penchev made their first contribution in https://github.com/apache/pulsar-client-go/pull/1234
