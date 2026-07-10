#!/bin/bash
############################
# About: To list users that has access to a github repo
#Input: Username 
#        token
#Owner:
############################

#github api url
API_URL:"https://api.github.com"

#Github username and personal access token
USERNAME=$username
TOKEN=$token

#User and Repository information
REPO_OWNER=$1 #organisation name
REPO_NAME=$2 # repository name

#Function to make a GET request to GitHub API
function github_api_get {
    local endpoint="$1"
    local url="${API_URL}/${endpoint}"

    #send a GET request to the github api with authentication
    curl -s -u "&{USERNAME}:${TOKEN}" "$url"
}

#functionto list users with read access to the repository
function list_users_with_read_access {
    local endpoint="repos/${REPO_OWNER}/${REPO_NAME}/collaborators"

    #fetch the list of collaborators on the repository
    # collaborators="$(github_api_get "$endpoint" "  --> this will give original json response
    # collaborators="$(github_api_get "$endpoint" | jq -r '.[] | select(.permission.pull == true) | .login')"
    collaborators="$(github_api_get "$endpoint")"

    #display the list of collaborators with read acccess
    if [[ -z "$collaborators" ]]; then
        echo "No users with read access found for ${REPPO_OWNER}/${REPO_NAME}:"
    else
        echo "Users with read access to ${REPPO_OWNER}/${REPO_NAME}:"
        echo "$collaborators"
    fi       
}

#Main script
echo "Listing users with read access to ${REPO_OWNER}/${REPO_NAME}..."
list_users_with_read_access