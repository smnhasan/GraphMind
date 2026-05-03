.PHONY: help dev up down logs migrate seed test clean

help:
	@echo "GraphMind - Available commands:"
	@echo "  make dev        - Start full development environment"
	@echo "  make up         - Start services in background"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - Follow backend logs"
	@echo "  make migrate    - Run database migrations"
	@echo "  make seed       - Seed sample data"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean everything"

dev:
	docker compose up --build

up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f backend

migrate:
	@echo "Running migrations..."
	docker compose exec backend python -c "import os; from sqlalchemy import text; from core.database import engine; conn = engine.connect(); [conn.execute(text(open(os.path.join('migrations', f)).read())) for f in sorted(os.listdir('migrations')) if f.endswith('.sql')]; conn.commit(); conn.close(); print('Migrations applied.')"

seed:
	@echo "Seeding sample data..."
	make migrate
	docker compose exec backend python seed.py

test:
	@echo "Running server tests..."
	PYTHONPATH=. python -m pytest tests/server/ -v --tb=short

clean:
	docker compose down -v
	rm -rf client/node_modules server/__pycache__ .pytest_cache postgres_data
	