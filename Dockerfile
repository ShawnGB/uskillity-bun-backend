FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .


RUN bun install --production
RUN bunx prisma generate


COPY src src
COPY tsconfig.json .
COPY prisma prisma
# COPY public public

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000