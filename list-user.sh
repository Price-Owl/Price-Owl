#!/bin/bash

############################
# About: List users that have access to a GitHub repository
# Usage: ./script.sh <repo_owner> <repo_name>
############################

# GitHub API URL
API_URL="https://api.github.com"

# GitHub username and Personal Access Token
USERNAME=$username
TOKEN=$token

# Repository information
REPO_OWNER=$1
REPO_NAME=$2

# Function to make GET request
github_api_get() {
    local endpoint=$1
    local url="${API_URL}/${endpoint}"

    curl -s -u "${USERNAME}:${TOKEN}" "$url"
}

# Function to list collaborators
list_users_with_read_access() {
    local endpoint="repos/${REPO_OWNER}/${REPO_NAME}/collaborators"

    collaborators=$(github_api_get "$endpoint")

    if [[ -z "$collaborators" ]]; then
        echo "No users found for ${REPO_OWNER}/${REPO_NAME}"
    else
        echo "Users with access to ${REPO_OWNER}/${REPO_NAME}:"
        echo "$collaborators"
    fi
}

echo "Listing users for ${REPO_OWNER}/${REPO_NAME}..."
list_users_with_read_access
