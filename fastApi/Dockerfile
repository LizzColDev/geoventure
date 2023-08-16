FROM python:3.8.10

WORKDIR /app

COPY pyproject.toml /app


RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-dev

COPY ./ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]