import os
import mysql.connector  
from dotenv import load_dotenv

load_dotenv()

def databaseConnect():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        if connection.is_connected():
            print("Conexão com o banco de dados bem-sucedida!")
        return connection
    except Exception as e:
        print(f"Erro ao conectar no banco de dados: {e}")
        return None
