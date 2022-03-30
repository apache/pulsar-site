---
id: client-java-2.8.2
title: Client Java 2.8.2 
sidebar_label: Client Java 2.8.2 
---

[Java Client] Fix producer data race to get cnx #13176  
[Java Client] Send CloseProducer on timeout #13161  
[Java Client] Let producer reconnect for state RegisteringSchema #12781  
[Java Client] Use epoch to version producer's cnx to prevent early delivery of messages #12779  
Pulsar Client: restore SchemaInfo.builder() API #12673  
[Java Client] Remove invalid call to Thread.currentThread().interrupt(); #12652  
Add additional error handling in auto partition update task MultiTopicsConsumerImpl #12620  
Fix invalid firstSentAt in log message when timeout first time #12588  
Update producer stats when producer close #12500  
Fix a typo in UnAckedMessageTracker #12467  
Fix the retry topic's `REAL_TOPIC` & `ORIGIN_MESSAGE_ID` property #12451  
Change the producer fence error log to debug level #12447  
[ISSUE-12291][Client]  'StartMessageId' and 'RollbackDuration' not working in MultiTopicsReader for non-partitioned topics #12308  
[Java Client] Use failPendingMessages to ensure proper cleanup #12259  
[Java Client] Fixed the producer OOM if got exception while add message to batch container #12170  
[Client] Fix endless receiveAsync loop in MultiTopicsConsumer #12044  
[Java Client] Make Audience Field Optional in OAuth2 Client Credentials #11988  
Forget to update memory usage on producer close #11906  
[Client] Fix ConcurrentModificationException in sendAsync #11884  
fix seek at batchIndex level receive duplicated messages #11826  
[Client] Reduce redundant FLOW requests for non-durable multi-topics consumer #11802  

