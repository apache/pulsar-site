# tokens



```shell
$ pulsar tokens subcommand
```



## create-secret-key

Create a new secret key
```shell
$ pulsar tokens create-secret-key options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the new secret key.|HS256|
| `-o, --output` | Write the secret key to a file instead of stdout|null|
| `-b, --base64` | Encode the key in base64|false|


## create-key-pair

Create a new or pair of keys public/private
```shell
$ pulsar tokens create-key-pair options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the new key pair.|RS256|
| `--output-private-key` | File where to write the private key|null|
| `--output-public-key` | File where to write the public key|null|


## create

Create a new token
```shell
$ pulsar tokens create options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the new key pair.|RS256|
| `-s, --subject` | Specify the 'subject' or 'principal' associate with this token|null|
| `-e, --expiry-time` | Relative expiry time for the token (eg: 1h, 3d, 10y). (m=minutes) Default: no expiration|null|
| `-sk, --secret-key` | Pass the secret key for signing the token. This can either be: data:, file:, etc..|null|
| `-pk, --private-key` | Pass the private key for signing the token. This can either be: data:, file:, etc..|null|


## show

Show the content of token
```shell
$ pulsar tokens show options
```

|Flag|Description|Default|
|---|---|---|
| `-i, --stdin` | Read token from standard input|false|
| `-f, --token-file` | Read token from a file|null|


## validate

Validate a token against a key
```shell
$ pulsar tokens validate options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the key pair if using public key.|RS256|
| `-i, --stdin` | Read token from standard input|false|
| `-f, --token-file` | Read token from a file|null|
| `-sk, --secret-key` | Pass the secret key for validating the token. This can either be: data:, file:, etc..|null|
| `-pk, --public-key` | Pass the public key for validating the token. This can either be: data:, file:, etc..|null|

