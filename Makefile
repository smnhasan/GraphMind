.PHONY: help dev up down logs migrate seed test clean

help:
	@echo "GraphMind - Available commands:"
	@echo "  make dev        - Start full development environment"
	@echo "  make up         - Start services in background"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - Follow backend logs"
	@echo "  make migrate    - Run database migrations"
	@echo "  make seed       - Seed sample data (TODO)"
	@echo "  make test       - Run tests"

dev:
	docker compose up --build

up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f backend

migrate:
	@echo "Running SQL migrations..."
	# Migrations are auto-run on first postgres start via docker-entrypoint-initdb.d
	# You can also run manually inside the container if needed.

seed:
	@echo "Seeding sample data (placeholder - implement later)"

test:
	@echo "Running server tests..."
	PYTHONPATH=. python -m pytest tests/server/ -v --tb=short

clean:
	docker compose down -v
	rm -rf client/node_modules server/__pycache__ server/.pytest_cache postgres_data
	