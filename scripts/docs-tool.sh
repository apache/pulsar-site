#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
supported_versions=$(node $SCRIPT_DIR/supported-versions.js)
UPSTREAM="${UPSTREAM:-origin}"

# Add these color definitions at the top of the file after UPSTREAM declaration
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Add this after the color definitions
if [ -t 1 ]; then
  # Terminal supports colors
  :
else
  # No color support - reset all colors to empty strings
  RED=''
  GREEN=''
  YELLOW=''
  BLUE=''
  NC=''
fi

function _cd_git_root() {
    cd $SCRIPT_DIR/..
}

function docs_apply_patch_to_versioned_docs() {
  (
    if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
      echo "Applies a patch file to versioned docs"
      if [ "$1" == "--help" ]; then
        echo "usage: $0 apply_patch_to_versioned_docs [--strip-count N] patchfile"
      fi
      return 0
    fi
    local patch_strip_count=2
    if [[ "$1" == "--strip-count"  ]]; then
      shift
      patch_strip_count="$1"
      shift
    fi
    local patchfile="${1:?Patch file is required}"
    shift
    _cd_git_root
    cd versioned_docs
    for version in $supported_versions; do
      local version_dir="version-${version}"
      cd "$version_dir"
      echo "Applying patch to $version_dir"
      patch -f -N -V none -p$patch_strip_count < "$patchfile" || echo "Failed to apply patch to $version_dir"
      cd ..
    done
  )
}

function docs_apply_last_commit_to_versioned_docs() {
  (
    if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
      echo "Applies the patch based on the most recent commit to versioned docs"
      if [ "$1" == "--help" ]; then
        echo "usage: $0 apply_last_commit_to_versioned_docs"
      fi
      return 0
    fi
    _cd_git_root
    local patchfile=$(mktemp)
    git diff -u HEAD~1 -- docs/ > "$patchfile"
    docs_apply_patch_to_versioned_docs "$patchfile" "$@"
  )
}

function docs_apply_changes_to_versioned_docs() {
  (
    if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
      echo "Applies committed changes made to docs directory between current branch and upstream main to versioned docs"
      if [ "$1" == "--help" ]; then
        echo "usage: $0 apply_changes_to_versioned_docs"
      fi
      return 0
    fi
    _cd_git_root
    local patchfile=$(mktemp)
    git diff -u $(git merge-base HEAD $UPSTREAM/main) -- docs/ > "$patchfile"
    docs_apply_patch_to_versioned_docs "$patchfile" "$@"
  )
}

function docs_delete_patch_backups() {
  (
    if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
      echo "Deletes patch backup files"
      if [ "$1" == "--help" ]; then
        echo "usage: $0 delete_patch_backups"
      fi
      return 0
    fi
    _cd_git_root
    find '(' -name "*.rej" -or -name "*.orig" ')' -delete
  )
}

function docs_supported_versions() {
  if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
    echo -e "${BLUE}Lists all supported versions${NC}"
    if [ "$1" == "--help" ]; then
      echo -e "usage: $0 ${GREEN}supported_versions${NC}"
    fi
    return 0
  fi
  echo $supported_versions
}

# lists all available functions in this tool
function docs_list_functions() {
  if [[ "$1" == "--desc" || "$1" == "--help" ]]; then
    echo -e "${BLUE}Lists all available functions in this tool${NC}"
    if [ "$1" == "--help" ]; then
      echo -e "usage: $0 ${GREEN}list_functions${NC}"
    fi
    return 0
  fi
  for function_name in $(declare -F | awk '{print $NF}' | sort | egrep '^docs_' | sed 's/^docs_//'); do
    printf "${GREEN}%-20s${NC}\t%s\n" $function_name "$(eval "docs_${function_name}" --desc)"
  done  
}

if [ -z "$1" ]; then
  echo -e "${BLUE}docs tool${NC}"
  echo -e "usage: $0 ${GREEN}[docs_tool_function_name]${NC} [arguments]"
  echo -e "Pass ${YELLOW}--help${NC} as the argument to get usage information for a tool."  
  echo ""
  echo -e "${BLUE}Available docs tool functions:${NC}"
  docs_list_functions
  exit 1
fi
docs_function_name="docs_$1"
shift

if [[ "$(LC_ALL=C type -t "${docs_function_name}")" == "function" ]]; then
  eval "$docs_function_name" "$@"
else
  echo -e "${RED}Invalid docs tool function${NC}"
  echo -e "${BLUE}Available docs tool functions:${NC}"
  docs_list_functions
  exit 1
fi
