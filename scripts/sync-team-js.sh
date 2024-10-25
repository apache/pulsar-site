#!/bin/bash
# This script is used to sync the team.js file with the Pulsar PMC and committers.
# Usage:
#  APACHE_USER=your-apache-id APACHE_PASSWORD='your-apache-password' ./scripts/sync-team-js.sh
# add a space as a prefix to the command so that your password doesn't get stored in your shell history
if [ -z "$APACHE_USER" ] || [ -z "$APACHE_PASSWORD" ]; then
  echo "Please set APACHE_USER and APACHE_PASSWORD environment variables"
  exit 1
fi
COOKIES_FILE=$(mktemp /tmp/sync-team-js-cookies.XXXXXX)
PULSAR_JSON=$(mktemp /tmp/sync-team-js-pulsar.XXXXXX)
trap 'rm -f "$COOKIES_FILE" "$PULSAR_JSON"' EXIT
# for some reason the cookies are needed from the first request
curl -c "$COOKIES_FILE" -L -u "$APACHE_USER:$APACHE_PASSWORD" -X GET https://whimsy.apache.org/roster > /dev/null
curl -b "$COOKIES_FILE" -L -u "$APACHE_USER:$APACHE_PASSWORD" -X GET https://whimsy.apache.org/roster/committee/pulsar.json > "$PULSAR_JSON"
{ 
  echo -n "module.exports = " && cat "$PULSAR_JSON" \
    | jq '{"pmc": [.roster| to_entries | sort_by(.key) | .[] | select(.value.role|startswith("PMC")) | {"name":.value.name, "apacheId": .key, "githubUsername": (.value.githubUsername|split(", "))}], "committers": [.roster| to_entries | sort_by(.key) | .[] | select(.value.role=="Committer") | {"name":.value.name, "apacheId": .key, "githubUsername": (.value.githubUsername|split(", "))}]}'
} | perl -pe 's/$/;\n/ if eof' > data/team.js && echo "Updated data/team.js"
echo -n "Accounts without githubUsername: "
cat "$PULSAR_JSON" | jq -r '[.roster | to_entries | .[] | select(.value.githubUsername == "") | (.key + "@apache.org")] | join(", ")'