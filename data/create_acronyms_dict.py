import os
import pandas as pd


if __name__ == '__main__':
    with open(os.path.join(__file__, '..', '..', 'src', 'js', 'acronyms_dict.js'), 'w', encoding='utf-8') as output_js:
        english_data = pd.read_csv(os.path.join(__file__, '..', 'Abbrev_English.csv'))
        output_js.write('const ENGLISH_ACRONYMS = {\n')
        for acronym in english_data['Abbreviation'].unique():
            definitions = english_data[english_data['Abbreviation'] == acronym]['Term'].values
            output_js.write('\t"' + acronym + '": ["' + '", "'.join(definitions) + '"],\n')
        output_js.write('};\n\n')

        french_data = pd.read_csv(os.path.join(__file__, '..', 'Abbrev_French.csv'))
        output_js.write('const FRENCH_ACRONYMS = {\n')
        for acronym in french_data['Abréviation'].unique():
            definitions = french_data[french_data['Abréviation'] == acronym]['Terme'].values
            output_js.write('\t"' + acronym + '": ["' + '", "'.join(definitions) + '"],\n')
        output_js.write('};\n\n')