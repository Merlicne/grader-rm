# Stage 1: Dependencies
FROM oven/bun:latest
WORKDIR /app
COPY . .

RUN bun install --frozen-lockfile

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Build the application
RUN bun run build


# Create a non-root user
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 bunjs
# Set the correct permission for prerender cache
RUN chown bunjs:bunjs .next

USER bunjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Use Bun to run the server
CMD ["bunx", "next", "start"] 