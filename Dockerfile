FROM nginx

EXPOSE 9001

COPY /build /app

COPY nginx.conf /etc/nginx/nginx.conf
