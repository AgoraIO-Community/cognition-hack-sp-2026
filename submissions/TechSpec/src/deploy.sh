#!/bin/bash
set -euo pipefail

# SpecForge — deploy script for OCI VM
# Usage: SSH into VM, clone repo, create backend/.env, then run this script

echo "==> Installing Docker..."
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg 2>/dev/null || true
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"

echo "==> Setting up firewall..."
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save 2>/dev/null || true

PUBLIC_IP=$(curl -s ifconfig.me)
DOMAIN="${PUBLIC_IP//./-}.nip.io"

echo "==> Public IP: $PUBLIC_IP"
echo "==> Domain: $DOMAIN"

export DOMAIN

echo "==> Building and starting containers..."
sudo DOMAIN="$DOMAIN" docker compose up -d --build

echo ""
echo "============================================"
echo "  SpecForge deployed!"
echo "  URL: https://$DOMAIN"
echo "  Health: https://$DOMAIN/health"
echo "  API: https://$DOMAIN/api/*"
echo "============================================"
