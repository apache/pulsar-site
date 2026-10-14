# tokens



```shell
$ pulsar tokens subcommand
```



## <em>create-secret-key</em>

Create a new secret key
```shell
$ pulsar tokens create-secret-key options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the new secret key.|HS256|
| `-o, --output` | Write the secret key to a file instead of stdout|null|
| `-b, --base64` | Encode the key in base64|false|


## <em>create-key-pair</em>

Create a new or pair of keys public/private
```shell
$ pulsar tokens create-key-pair options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --signature-algorithm` | The signature algorithm for the new key pair.|RS256|
| `--output-private-key` | File where to write the private key|null|
| `--output-public-key` | File where to write the public key|null|


## <em>create</em>

Create a new token
```shell
$ pulsar tokens create options
```

|Flag|Description|Default|
|---|---|---|
| `-s, --subject` | Specify the 'subject' or 'principal' associate with this token|null|
| `-pk, --private-key` | Pass the private key for signing the token. This can either be: data:, file:, etc..|null|
| `-e, --expiry-time` | Relative expiry time for the token (eg: 1h, 3d, 10y). (m=minutes) Default: no expiration|null|
| `-sk, --secret-key` | Pass the secret key for signing the token. This can either be: data:, file:, etc..|null|
| `-a, --signature-algorithm` | The signature algorithm for the new key pair.|RS256|


## <em>show</em>

Show the content of token
```shell
$ pulsar tokens show options
```

|Flag|Description|Default|
|---|---|---|
| `-i, --stdin` | Read token from standard input|false|
| `-f, --token-file` | Read token from a file|null|


## <em>validate</em>

Validate a token against a key
```shell
$ pulsar tokens validate options
```

|Flag|Description|Default|
|---|---|---|
| `-f, --token-file` | Read token from a file|null|
| `-pk, --public-key` | Pass the public key for validating the token. This can either be: data:, file:, etc..|null|
| `-i, --stdin` | Read token from standard input|false|
| `-sk, --secret-key` | Pass the secret key for validating the token. This can either be: data:, file:, etc..|null|
| `-a, --signature-algorithm` | The signature algorithm for the key pair if using public key.|RS256|

