import os
import csv

if __name__ == '__main__':
    with open(os.path.join(__file__, '..', 'Abbrev_English.csv'), newline='') as english_csv, \
    open(os.path.join(__file__, '..', 'Abbrev_English.csv'), newline='') as french_csv, \
    open(os.path.join(__file__, '..', '..', 'src', 'js', 'acronyms.js'), 'w') as output_js:
        for input_csv, var_name in zip([english_csv, french_csv], ['englishAcronyms', 'frenchAcronyms']):
            output_js.write('const ' + var_name + ' = {\n')
            reader = csv.reader(input_csv, delimiter=',')
            next(reader, None) # skip header
            for row in reader:
                output_js.write('\t"' + row[0] + '": "' + row[1] + '",\n')
            output_js.write('};\n\n')