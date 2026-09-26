#!/usr/bin/env bash
# Idempotent setup for the Commune chat app development environment.
# Installs MongoDB (if missing) and Node dependencies for the client and server.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# --- MongoDB (install once if missing) ---
if ! command -v mongod >/dev/null 2>&1; then
  echo "Installing MongoDB Community Edition..."
  sudo apt-get update
  sudo apt-get install -y gnupg curl
  curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc \
    | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
    | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
fi

# Ensure MongoDB data and log directories exist and are writable.
sudo mkdir -p /data/db /var/log/mongodb
sudo chown -R "$(id -u):$(id -g)" /data/db /var/log/mongodb

# --- Node dependencies ---
# Some branches committed server/node_modules with broken binary permissions,
# so reinstall cleanly to guarantee working CLIs (e.g. nodemon).
if [ -f server/package.json ]; then
  echo "Installing server dependencies..."
  (cd server && rm -rf node_modules && npm install)
fi

if [ -f client/package.json ]; then
  echo "Installing client dependencies..."
  (cd client && npm install)
fi

echo "Install complete."
