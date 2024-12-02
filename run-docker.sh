#!/bin/bash

# Make script executable
chmod +x run-docker.sh

# Stop any running containers
docker-compose down

# Build and start the services in detached mode
docker-compose up --build -d

# Watch the logs
docker-compose logs -f