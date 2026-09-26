#!/usr/bin/env bash
# Per-boot startup for the Commune chat app: ensure MongoDB is running.
set -euo pipefail

sudo mkdir -p /data/db /var/log/mongodb
sudo chown -R "$(id -u):$(id -g)" /data/db /var/log/mongodb 2>/dev/null || true

if pgrep -x mongod >/dev/null 2>&1; then
  echo "mongod already running."
else
  echo "Starting mongod..."
  mongod --dbpath /data/db --bind_ip 127.0.0.1 --port 27017 \
    --fork --logpath /var/log/mongodb/mongod.log
fi

# Wait for MongoDB to accept connections.
for _ in $(seq 1 30); do
  if mongosh --quiet --eval "db.runCommand({ping:1})" >/dev/null 2>&1; then
    echo "MongoDB is ready."
    exit 0
  fi
  sleep 1
done

echo "MongoDB did not become ready in time." >&2
exit 1
