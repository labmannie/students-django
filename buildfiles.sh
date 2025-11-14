#!/usr/bin/env bash
# buildfiles.sh — build Docker image and optionally push to a registry
# Usage:
#   ./buildfiles.sh                # build locally
#   ./buildfiles.sh push myrepo/myimage:tag  # build and push

set -euo pipefail
IMAGE_NAME="students-django:latest"

if [ "${1-}" = "push" ]; then
  if [ -z "${2-}" ]; then
    echo "Usage: $0 push <registry/repo:tag>"
    exit 1
  fi
  IMAGE_NAME="$2"
fi

echo "Building Docker image: ${IMAGE_NAME}"
docker build -t "${IMAGE_NAME}" .

echo "Built ${IMAGE_NAME}"

if [ "${1-}" = "push" ]; then
  echo "Pushing ${IMAGE_NAME} to registry"
  docker push "${IMAGE_NAME}"
  echo "Pushed"
fi
