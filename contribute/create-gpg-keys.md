---
id: create-gpg-keys
title: Creating GPG keys
---

This page provides instructions for Pulsar committers on how to do the initial GPG setup.

This is a condensed version of instructions available at http://apache.org/dev/openpgp.html.

Create ~/.gnupg directory with proper permissions before adding custom config:
```shell
mkdir ~/.gnupg
chmod 0700 ~/.gnupg
```

Install GnuPG. For example on macOS:

```shell
brew install gnupg
# On MacOS, install keychain integration
brew install pinentry-mac
echo "pinentry-program $(brew --prefix)/bin/pinentry-mac" | tee -a ~/.gnupg/gpg-agent.conf
```

Configure gnupg to use standard DNS resolution:

```shell
# resolves common "gpg: keyserver receive failed: Network is unreachable" and 
# "gpg: keyserver receive failed: No keyserver available" errors
echo "standard-resolver" >  ~/.gnupg/dirmngr.conf
sudo pkill dirmngr
```

Set configuration to use `SHA512` keys by default:

```shell
cat <<EOL >> ~/.gnupg/gpg.conf
personal-digest-preferences SHA512
cert-digest-algo SHA512
default-preference-list SHA512 SHA384 SHA256 SHA224 AES256 AES192 AES CAST5 ZLIB BZIP2 ZIP Uncompressed
EOL
```

Check the version:

```shell
gpg --version

# gpg (GnuPG) 2.1.22
# ...
```

Generate new GPG key:

:::note

New **RSA** keys generated should be at least **4096** bits.

The requested passphrase is for your GPG private key. The passphrase should be a strong password, and you should store it securely in your personal password manager.

:::


```shell
# For 1.x or 2.0.x
gpg --gen-key

# For 2.1.x
gpg --full-gen-key

gpg (GnuPG) 2.1.22; Copyright (C) 2017 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: test user
Email address: test@apache.org
Comment: CODE SIGNING KEY
You selected this USER-ID:
    "test user (CODE SIGNING KEY) <test@apache.org>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
<Enter passphrase>
```

## Upload the key to a public key server

Use the key id to publish it to several public key servers:

```shell
# find out your key id
APACHEID=your_asf_id
KEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: '{print $5}')
echo "key id: $KEY_ID"
# send the public key to multiple servers
gpg --send-key $KEY_ID
gpg --send-key --keyserver=keys.openpgp.org $KEY_ID
gpg --send-key --keyserver=keyserver.ubuntu.com $KEY_ID
```

## Appending the key to KEYS files

The GPG key needs to be appended to `KEYS` file for the release candidates.

:::note

A PMC member should complete this step. 
Please provide your GPG key id to the PMC member to verify that it matches the one uploaded to the key servers.

:::

```shell
# Checkout the SVN folder containing the KEYS file
svn co https://dist.apache.org/repos/dist/release/pulsar pulsar-dist-release-keys --depth files
cd pulsar-dist-release-keys
svn up KEYS

APACHEID=apacheid

# import the key from the keyserver, ensure that the key id matches the one provided by the committer
gpg --search-keys $APACHEID@apache.org
KEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: '{print $5}')
echo "key id: $KEY_ID"

# Export the key in ascii format and append it to the file
# Make sure that the GPG key id matches the one from the committer
( gpg --list-sigs $APACHEID@apache.org
  gpg --export --armor $APACHEID@apache.org ) | tee -a KEYS

# Commit to SVN
svn ci -m "Added gpg key for $APACHEID"
```
