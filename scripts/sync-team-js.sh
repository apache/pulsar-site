#!/bin/bash
# This script is used to sync the team.js file with the Pulsar PMC and committers.
# Usage:
# 1. Log in to https://whimsy.apache.org/roster/committee/pulsar with browser
# 2. Append ".json" to URL so that browser goes to https://whimsy.apache.org/roster/committee/pulsar.json
# 3. Click "Save as..." and store the JSON as ~/Downloads/pulsar.json
# 4. Run this script with "scripts/sync-team-js.sh"
PULSAR_JSON="${1:-"$HOME/Downloads/pulsar.json"}"
{ 
  echo -n "module.exports = " && cat "$PULSAR_JSON" \
    | jq '{"pmc": [.roster| to_entries | sort_by(.key) | .[] | select(.value.role|startswith("PMC")) | {"name":.value.name, "apacheId": .key, "githubUsername": (.value.githubUsername|split(", "))}], "committers": [.roster| to_entries | sort_by(.key) | .[] | select(.value.role=="Committer") | {"name":.value.name, "apacheId": .key, "githubUsername": (.value.githubUsername|split(", "))}]}'
} | perl -pe 's/$/;\n/ if eof' > data/team.js