FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY prisma .

RUN bun install --production

COPY src src
COPY tsconfig.json .

RUN bun x prisma generate

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000