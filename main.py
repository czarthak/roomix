import mysql.connector
from mysql.connector import Error
#hello world
try:
    connection = mysql.connector.connect(host='localhost',
                                         database='inventory',
                                         user='root',
                                         password='ENTER PASSWORD')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        cursor.execute('show tables;')
        tables = cursor.fetchall()
        print(tables)
        for i in tables:
            print(i)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")