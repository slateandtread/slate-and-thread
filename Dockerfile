FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG SITE_SUPABASE_URL
ARG SITE_SUPABASE_PUBLISHABLE
ARG SITE_CANONICAL_URL
RUN VITE_SUPABASE_URL="$SITE_SUPABASE_URL" \
  VITE_SUPABASE_PUBLISHABLE_KEY="$SITE_SUPABASE_PUBLISHABLE" \
  VITE_SITE_URL="$SITE_CANONICAL_URL" \
  npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
