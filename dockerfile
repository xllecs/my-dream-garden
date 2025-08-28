FROM node:22.18.0

WORKDIR /my_dream_garden

COPY package*.json .
RUN npm install

COPY . .

RUN ["npm", "run", "prisma:generate"]

RUN ["npm", "run", "build"]

CMD ["sh", "-c", "npm run prisma:migrate:prod && npm run start"]
