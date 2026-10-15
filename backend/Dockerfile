FROM node:22

WORKDIR /app

COPY package*.json ./

# have to put legacy dependency because of 
# better auth and drizzle orm version discrepancies
RUN npm install --legacy-peer-deps

COPY . .

COPY start.sh .

EXPOSE 4000

CMD ["sh", "start.sh"]