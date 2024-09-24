import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

def create_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            password=user_password,
            database=db_name
        )
        print("Conexão bem-sucedida!")
    except Error as e:
        print(f"Ocorreu um erro: {e}")
    return connection

# Acessar as variáveis de ambiente
host = os.getenv("DB_HOST")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
database = os.getenv("DB_NAME")

conn = create_connection(host, user, password, database)

# Não esqueça de fechar a conexão
if conn:
    conn.close()
