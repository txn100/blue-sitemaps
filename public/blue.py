import os
import csv
from pymongo import MongoClient
import urllib.parse
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# MongoDB connection details from .env
username = urllib.parse.quote_plus(os.getenv('MONGO_USERNAME'))
password = urllib.parse.quote_plus(os.getenv('MONGO_PASSWORD'))
cluster = os.getenv('MONGO_CLUSTER')
db_name = os.getenv('MONGO_DB')
collection_name = os.getenv('MONGO_COLLECTION')

# CSV file path from .env
csv_file_path = os.getenv('CSV_FILE_PATH')

# Connect to MongoDB with SSL certificate verification disabled
connection_string = f'mongodb+srv://{username}:{password}@{cluster}/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true'
client = MongoClient(connection_string)

db = client[db_name]
collection = db[collection_name]

# Read CSV and insert into MongoDB
def csv_to_mongodb(csv_file_path):
    try:
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)

            for row in csv_reader:
                print(row)  # Print the current row
                collection.insert_one(row)
        print("Data insertion completed.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Execute the insertion
csv_to_mongodb(csv_file_path)