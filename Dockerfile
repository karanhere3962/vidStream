FROM python:3.7-buster

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nginx -y
ADD ./frontend /usr/frontend/
ADD ./VideoStreaming /usr/VideoStreaming/
ADD ./gunicorn_settings/gunicorn_server_conf /usr/gunicorn_settings/
ADD ./nginx_sites/ /etc/nginx/sites_available/
ADD ./gunicorn_settings/gunicorn.service /etc/systemd/system/
ADD ./gunicorn_settings/gunicorn.socket /etc/systemd/system/

# RUN apt-get install -y python3
# RUN ls /usr/bin/
# RUN ln -s /etc/nginx/sites-available/VideoStreaming /etc/nginx/sites-enabled/
RUN pip3 install -r /usr/VideoStreaming/requirements.txt
RUN /usr/VideoStreaming/manage.py  collectstatic --noinput
EXPOSE 8000
ENTRYPOINT /usr/VideoStreaming/manage.py makemigrations 
ENTRYPOINT /usr/VideoStreaming/manage.py migrate
ENTRYPOINT /usr/VideoStreaming/manage.py runserver 
# CMD service gunicorn.service start && service nginx.service start
# ENTRYPOINT nginx -c /etc/nginx/nginx.conf -g 'daemon off;'




