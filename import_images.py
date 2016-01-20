import sqlite3
# conn = sqlite3.connect('/users/nathan/git/zumper/zumper.db')
conn = sqlite3.connect('zumper.db')

# c = conn.cursor()

# Import images into DB
start_ind = 81295755

for x in xrange(1, 10000):
    index = start_ind + x
    url = 'https://d37lj287rvypnj.cloudfront.net/' + str(index) + '/full'

    # Insert a row of data
    insert_sql = "INSERT INTO images (url, length, width) VALUES (\'" + url + "\',200, 200)"
    print insert_sql
    conn.execute(insert_sql)

    # print url


# Save (commit) the changes
conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()
