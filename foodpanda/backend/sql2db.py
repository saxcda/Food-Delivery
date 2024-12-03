import sqlite3
import os

def create_database(inputfile, outputfile):
    try:
        os.remove(outputfile)
    except:
        pass
    conn = sqlite3.connect(outputfile)
    cursor = conn.cursor()

    with open(inputfile, 'r',encoding="utf-8") as f:
        sql_commands = f.read()
        #print(sql_commands)

    commands = sql_commands.split(';')

    print('\n')
    print(commands)
    for command in commands:
        command = command.strip()
        if command:
            cursor.execute(str(command))        

    conn.commit()
    conn.close()

sql_path = "./sql/foodpanda.sql"
db_path = "./db/foodpanda.db"

create_database(sql_path, db_path)