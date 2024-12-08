import os
import json
from pymongo import MongoClient


def load_json_to_mongo(json_folder: str, db_name: str):
    # Подключаемся к MongoDB (по умолчанию на localhost:27017)
    client = MongoClient('mongodb://localhost:27017/')

    # Создаем/открываем базу данных
    db = client[db_name]

    # Получаем список всех файлов в папке
    for filename in os.listdir(json_folder):
        # Проверяем, что файл имеет расширение .json
        if filename.endswith('.json'):
            file_path = os.path.join(json_folder, filename)

            # Извлекаем имя файла без расширения для создания коллекции
            collection_name = filename.replace('.json', '')

            # Открываем и загружаем JSON данные из файла
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

                # Если данные не являются списком, делаем их списком
                if not isinstance(data, list):
                    data = [data]

                # Создаем коллекцию с именем файла и добавляем данные
                collection = db[collection_name]
                collection.insert_many(data)  # Вставляем все элементы в коллекцию

            print(f"Файл {filename} успешно добавлен как коллекция '{collection_name}'.")


# Указываем путь к папке с JSON файлами
json_folder = 'schedule_jsons'

# Вызываем функцию для загрузки данных в MongoDB
load_json_to_mongo(json_folder, 'Schedule')
