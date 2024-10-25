#!/usr/bin/env python3

# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import json
import sys
import re

def add_version_to_releases_json(new_version):
    file_path = 'releases.json'

    # Read the JSON file
    with open(file_path, 'r') as file:
        versions = json.load(file)

    # Split the new version into major, minor, and patch
    new_major, new_minor, _ = new_version.split('.')

    # Find the position to insert the new version
    insert_index = 0
    for i, version in enumerate(versions):
        major, minor, _ = version.split('.')
        if major == new_major and minor == new_minor:
            insert_index = i
            break

    # Insert the new version at the found position
    updated_versions = versions[:insert_index] + [new_version] + versions[insert_index:]

    # Write the updated JSON back to the file
    with open(file_path, 'w') as file:
        json.dump(updated_versions, file, indent=2)

    print(f"Added version {new_version} to {file_path}")

def add_version_to_release_pulsar_js(new_version, author, published_at):
    file_path = 'data/release-pulsar.js'

    # Read the file content
    with open(file_path, 'r') as file:
        content = file.read()

    # Extract the JSON array from the file content
    match = re.search(r'module\.exports\s*=\s*(\[.*\])', content, re.DOTALL)
    if not match:
        print(f"Error: Could not find the JSON array in {file_path}")
        sys.exit(1)
    json_array_str = match.group(1)
    releases = json.loads(json_array_str)

    # Split the new version into major, minor, and patch
    new_major, new_minor, _ = new_version.split('.')

    major_minor_x = f"v{new_major}.{new_minor}.x"

    # Create the new release entry
    new_release = {
        "author": author,
        "tagName": f"v{new_version}",
        "publishedAt": published_at,
        "vtag": f"{new_major}.{new_minor}.x",
        "releaseNotes": f"/release-notes/versioned/pulsar-{new_version}/",
        "doc": f"/docs/{new_major}.{new_minor}.x",
        "version": major_minor_x
    }

    # Find the position to insert the new version
    insert_index = 0
    for i, release in enumerate(releases):
        major, minor, _ = release['tagName'][1:].split('.')
        if major == new_major and minor == new_minor:
            insert_index = i
            break

    # Insert the new release at the found position
    releases.insert(insert_index, new_release)

    # Update the version fields
    for i, release in enumerate(releases):
        if i == insert_index:
            release['version'] = major_minor_x
        elif release['version'] == major_minor_x:
            release['version'] = ""

    # Convert the updated releases back to a JSON string
    updated_json_array_str = json.dumps(releases, indent=2)

    # Replace the old JSON array in the file content with the updated one
    updated_content = re.sub(r'module\.exports\s*=\s*\[.*\]', f'module.exports = {updated_json_array_str}', content, flags=re.DOTALL)

    # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.write(updated_content)

    print(f"Added version {new_version} to {file_path}")

def add_version_to_release_java_js(new_version):
    file_path = 'data/release-java.js'

    # Read the file content
    with open(file_path, 'r') as file:
        content = file.read()

    # Extract the JSON array from the file content
    match = re.search(r'module\.exports\s*=\s*(\[.*\])', content, re.DOTALL)
    if not match:
        print(f"Error: Could not find the JSON array in {file_path}")
        sys.exit(1)
    json_array_str = match.group(1)
    releases = json.loads(json_array_str)

    # Split the new version into major, minor, and patch
    new_major, new_minor, _ = new_version.split('.')

    major_minor_x = f"v{new_major}.{new_minor}.x"

    # Create the new release entry
    new_release = {
        "tagName": f"v{new_version}",
        "vtag": f"{new_major}.{new_minor}.x",
        "releaseNotes": f"/release-notes/versioned/client-java-{new_version}/",
        "doc": f"/docs/{new_major}.{new_minor}.x/client-libraries-java",
        "version": major_minor_x
    }

    # Find the position to insert the new version
    insert_index = 0
    for i, release in enumerate(releases):
        major, minor, _ = release['tagName'][1:].split('.')
        if major == new_major and minor == new_minor:
            insert_index = i
            break

    # Insert the new release at the found position
    releases.insert(insert_index, new_release)

    # Update the version fields
    for i, release in enumerate(releases):
        if i == insert_index:
            release['version'] = major_minor_x
        elif release['version'] == major_minor_x:
            release['version'] = ""

    # Convert the updated releases back to a JSON string
    updated_json_array_str = json.dumps(releases, indent=2)

    # Replace the old JSON array in the file content with the updated one
    updated_content = re.sub(r'module\.exports\s*=\s*\[.*\]', f'module.exports = {updated_json_array_str}', content, flags=re.DOTALL)

    # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.write(updated_content)

    print(f"Added version {new_version} to {file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python register_new_version.py <new-version> <author> <published-at>")
        sys.exit(1)

    new_version = sys.argv[1]
    author = sys.argv[2]
    published_at = sys.argv[3]
    add_version_to_releases_json(new_version)
    add_version_to_release_pulsar_js(new_version, author, published_at)
    add_version_to_release_java_js(new_version)