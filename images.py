# import sqlite3
# conn = sqlite3.connect('zumper.db')


def get_images(start_index=0):
    import sqlite3
    conn = sqlite3.connect('zumper.db')
    get_sql = "SELECT url FROM images WHERE id > " + str(start_index) + \
        " LIMIT 20"

    results = conn.execute(get_sql)
    ret_val = []
    for row in results:
        ret_val.append(row[0])
    # print results

    return ret_val
