FROM node:18-alpine

# Install necessary tools
RUN apk add --no-cache \
    postgresql-client \
    bash \
    curl \
    netcat-openbsd

# Copy the test script
COPY test-secrets.js /app/test-secrets.js

# Set working directory
WORKDIR /app

# Set the entrypoint
ENTRYPOINT ["node", "test-secrets.js"]
