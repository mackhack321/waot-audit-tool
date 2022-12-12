import csv

file = csv.reader(open("coefficients.csv", "r", encoding="utf-8-sig"))

columns = []
hours = []
rows = []

for row in file:
    columns.append(row)
    break

for row in file:
    hours.append(row[0])
    rows.append(row[1::])

columns = columns[0][1::]
# print(columns)

# print(columns[0][1::])
# print(hours)
# print(rows)

# print(hours[4], columns[4])
# print(rows[4][4])

dictstring = "["

for h in range(0, len(hours)):
    for c in range(0, len(columns)):
        # print(hours[h],columns[c])
        # print(f"{hours[h]}{columns[c].split('0')[1]}")
        # print(rows[h][c])

        dictstring += "{"
        dictstring += f"{hours[h]}{columns[c].split('0')[1]}: {rows[h][c]}"
        dictstring += "},\n"

dictstring += "]"

print(dictstring)