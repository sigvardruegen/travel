
# Catalog API Contract

## Endpoints

- `GET /catalog` — список объектов (фильтрация, сортировка, bbox, пагинация)
- `GET /filters` — список фильтров
- `GET /regions` — регионы для фильтра

## Параметры

- `bbox`: `"36.1,54.8,38.5,56.5"` — область карты
- `region`: строка — регион
- `type`: тип жилья
- `price_min`, `price_max`: диапазон
- `sort`: popular, price_asc, price_desc, unique
- `page`, `per_page`: пагинация

## Формат данных

Смотри файл `catalog.openapi.yaml` и `catalog.schema.json`
