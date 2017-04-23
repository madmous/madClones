FROM python:3.6

COPY . /

WORKDIR /

RUN pip install -r requirements.txt

ENV PORT 80
EXPOSE $PORT

CMD python src/index.py