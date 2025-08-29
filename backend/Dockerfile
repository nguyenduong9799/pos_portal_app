# ---------------------
# Build stage
# ---------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install all deps (including dev for build)
RUN npm ci

# Copy source code
COPY . .

# Compile TypeScript -> dist
RUN npx tsc -p tsconfig.build.json \
  && [ -d dist ] || (echo "❌ Build failed: dist folder not found" && exit 1)

# ---------------------
# Production stage
# ---------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy only package files, install prod deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built code from build stage
COPY --from=build /app/dist ./dist

# Fix permissions
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose app port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start app
CMD ["node", "dist/main"]
