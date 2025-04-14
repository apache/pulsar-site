#!/usr/bin/env -S uv run

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

# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "requests",
# ]
# ///
import json
import os
import requests
from urllib.parse import urljoin
import sys

def extract_github_usernames(js_file_path):
    """
    Extract GitHub usernames from the team.js file.
    """
    try:
        with open(js_file_path, 'r') as file:
            # Read the content of the file
            content = file.read()
            
            # Remove the "module.exports = " part to get valid JSON
            json_content = content.replace("module.exports = ", "").rstrip().rstrip(';')
            
            # Parse the JSON
            data = json.loads(json_content)
            
            # Extract GitHub usernames from PMC members
            github_usernames = []
            for member in data.get("pmc", []):
                github_usernames.extend(member.get("githubUsername", []))
            
            # Extract GitHub usernames from committers
            for committer in data.get("committers", []):
                github_usernames.extend(committer.get("githubUsername", []))
            
            # Remove duplicates and empty values
            github_usernames = [username for username in github_usernames if username]
            return list(set(github_usernames))
    
    except Exception as e:
        print(f"Error extracting GitHub usernames: {e}")
        return []

def download_github_profile_images(github_usernames, output_dir):
    """
    Download GitHub profile images for the given usernames.
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    success_count = 0
    error_count = 0
    
    print(f"Found {len(github_usernames)} GitHub usernames. Starting download...")
    
    for username in github_usernames:
        image_url = f"https://github.com/{username}.png"
        output_path = os.path.join(output_dir, f"{username}.png")
        
        try:
            response = requests.get(image_url, stream=True, allow_redirects=True)
            
            # Check if the request was successful
            if response.status_code == 200:
                # Save the image
                with open(output_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                
                success_count += 1
                print(f"Downloaded: {username}.png")
            else:
                print(f"Failed to download {username}.png: HTTP Status {response.status_code}")
                error_count += 1
        
        except Exception as e:
            print(f"Error downloading {username}.png: {e}")
            error_count += 1
    
    print(f"\nDownload complete: {success_count} successful, {error_count} failed.")
    return success_count, error_count

def main():
    # Get the path to the team.js file from command line or use default
    js_file_path = "data/team.js"
    if len(sys.argv) > 1:
        js_file_path = sys.argv[1]
    
    # Set the output directory
    output_dir = "static/img/team"
    if len(sys.argv) > 2:
        output_dir = sys.argv[2]
    
    print(f"Using team.js file: {js_file_path}")
    print(f"Output directory: {output_dir}")
    
    # Extract GitHub usernames
    github_usernames = extract_github_usernames(js_file_path)
    
    if not github_usernames:
        print("No GitHub usernames found. Exiting.")
        return
    
    # Download profile images
    download_github_profile_images(github_usernames, output_dir)

if __name__ == "__main__":
    main()
