"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[1318],{43706:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>p});const s=JSON.parse('{"id":"create-gpg-keys","title":"Creating GPG keys","description":"This page provides instructions for Pulsar committers on how to do the initial GPG setup.","source":"@site/contribute/create-gpg-keys.md","sourceDirName":".","slug":"/create-gpg-keys","permalink":"/contribute/create-gpg-keys","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/pulsar-site/edit/main/contribute/create-gpg-keys.md","tags":[],"version":"current","lastUpdatedBy":"github-actions[bot]","lastUpdatedAt":1741656974000,"frontMatter":{"id":"create-gpg-keys","title":"Creating GPG keys"},"sidebar":"sidebarDevelopment","previous":{"title":"Release process","permalink":"/contribute/release-process"},"next":{"title":"Writing release notes","permalink":"/contribute/release-note-guide"}}');var r=t(74848),i=t(28453);const a={id:"create-gpg-keys",title:"Creating GPG keys"},o=void 0,l={},p=[{value:"Upload the key to a public key server",id:"upload-the-key-to-a-public-key-server",level:2},{value:"Make your the Apache key the default key for GPG",id:"make-your-the-apache-key-the-default-key-for-gpg",level:2},{value:"Appending the key to KEYS files",id:"appending-the-key-to-keys-files",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"This page provides instructions for Pulsar committers on how to do the initial GPG setup."}),"\n",(0,r.jsxs)(n.p,{children:["This is a condensed version of instructions available at ",(0,r.jsx)(n.a,{href:"http://apache.org/dev/openpgp.html",children:"http://apache.org/dev/openpgp.html"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Create ~/.gnupg directory with proper permissions before adding custom config:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"mkdir ~/.gnupg\nchmod 0700 ~/.gnupg\n"})}),"\n",(0,r.jsx)(n.p,{children:"Install GnuPG. For example on macOS:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'brew install gnupg\n# On MacOS, install keychain integration\nbrew install pinentry-mac\necho "pinentry-program $(brew --prefix)/bin/pinentry-mac" | tee -a ~/.gnupg/gpg-agent.conf\n'})}),"\n",(0,r.jsx)(n.p,{children:"Configure gnupg to use standard DNS resolution:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'# resolves common "gpg: keyserver receive failed: Network is unreachable" and \n# "gpg: keyserver receive failed: No keyserver available" errors\necho "standard-resolver" >  ~/.gnupg/dirmngr.conf\nsudo pkill dirmngr\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Set configuration to use ",(0,r.jsx)(n.code,{children:"SHA512"})," keys by default:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"cat <<EOL >> ~/.gnupg/gpg.conf\npersonal-digest-preferences SHA512\ncert-digest-algo SHA512\ndefault-preference-list SHA512 SHA384 SHA256 SHA224 AES256 AES192 AES CAST5 ZLIB BZIP2 ZIP Uncompressed\nEOL\n"})}),"\n",(0,r.jsx)(n.p,{children:"Check the version:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"gpg --version\n\n# gpg (GnuPG) 2.1.22\n# ...\n"})}),"\n",(0,r.jsx)(n.p,{children:"Generate new GPG key:"}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsxs)(n.p,{children:["New ",(0,r.jsx)(n.strong,{children:"RSA"})," keys generated should be at least ",(0,r.jsx)(n.strong,{children:"4096"})," bits."]}),(0,r.jsx)(n.p,{children:"The requested passphrase is for your GPG private key. The passphrase should be a strong password, and you should store it securely in your personal password manager."})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'# For 1.x or 2.0.x\ngpg --gen-key\n\n# For 2.1.x\ngpg --full-gen-key\n\ngpg (GnuPG) 2.1.22; Copyright (C) 2017 Free Software Foundation, Inc.\nThis is free software: you are free to change and redistribute it.\nThere is NO WARRANTY, to the extent permitted by law.\n\nPlease select what kind of key you want:\n   (1) RSA and RSA (default)\n   (2) DSA and Elgamal\n   (3) DSA (sign only)\n   (4) RSA (sign only)\nYour selection? 1\nRSA keys may be between 1024 and 4096 bits long.\nWhat keysize do you want? (2048) 4096\nRequested keysize is 4096 bits\nPlease specify how long the key should be valid.\n         0 = key does not expire\n      <n>  = key expires in n days\n      <n>w = key expires in n weeks\n      <n>m = key expires in n months\n      <n>y = key expires in n years\nKey is valid for? (0) 0\nKey does not expire at all\nIs this correct? (y/N) y\n\nGnuPG needs to construct a user ID to identify your key.\n\nReal name: test user\nEmail address: test@apache.org\nComment: CODE SIGNING KEY\nYou selected this USER-ID:\n    "test user (CODE SIGNING KEY) <test@apache.org>"\n\nChange (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O\n<Enter passphrase>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"upload-the-key-to-a-public-key-server",children:"Upload the key to a public key server"}),"\n",(0,r.jsx)(n.p,{children:"Use the key id to publish it to several public key servers:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'# find out your key id\nAPACHEID=your_asf_id\nKEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: \'{print $5}\')\necho "key id: $KEY_ID"\n# send the public key to multiple servers\ngpg --send-key $KEY_ID\ngpg --send-key --keyserver=keys.openpgp.org $KEY_ID\ngpg --send-key --keyserver=keyserver.ubuntu.com $KEY_ID\n'})}),"\n",(0,r.jsx)(n.h2,{id:"make-your-the-apache-key-the-default-key-for-gpg",children:"Make your the Apache key the default key for GPG"}),"\n",(0,r.jsx)(n.p,{children:"This is required for signing the release artifacts"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'APACHEID=your_asf_id\nKEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: \'{print $5}\')\necho "default-key $KEY_ID" >> ~/.gnupg/gpg.conf\n'})}),"\n",(0,r.jsx)(n.h2,{id:"appending-the-key-to-keys-files",children:"Appending the key to KEYS files"}),"\n",(0,r.jsxs)(n.p,{children:["The GPG key needs to be appended to ",(0,r.jsx)(n.code,{children:"KEYS"})," file for the release candidates."]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsx)(n.p,{children:"A PMC member should complete this step.\nPlease provide your GPG key id to the PMC member to verify that it matches the one uploaded to the key servers."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'# Checkout the SVN folder containing the KEYS file\nsvn co https://dist.apache.org/repos/dist/release/pulsar pulsar-dist-release-keys --depth files\ncd pulsar-dist-release-keys\nsvn up KEYS\n\nAPACHEID=apacheid\n\n# import the key from the keyserver, ensure that the key id matches the one provided by the committer\ngpg --search-keys $APACHEID@apache.org\nKEY_ID=$(gpg --list-keys --with-colons $APACHEID@apache.org | egrep "^pub" | awk -F: \'{print $5}\')\necho "key id: $KEY_ID"\n\n# Export the key in ascii format and append it to the file\n# Make sure that the GPG key id matches the one from the committer\n( gpg --list-sigs $APACHEID@apache.org\n  gpg --export --armor $APACHEID@apache.org ) | tee -a KEYS\n\n# Commit to SVN\nsvn ci -m "Added gpg key for $APACHEID"\n'})})]})}function c(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var s=t(96540);const r={},i=s.createContext(r);function a(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);