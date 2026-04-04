import mysql.connector

try:
    connection = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="112227",
        database="smart_revision_db"
    )
    if connection.is_connected():
        print("SUCCESS! Connected to MySQL database.")
        connection.close()
except Exception as e:
    print(f"FAILED: {e}")
