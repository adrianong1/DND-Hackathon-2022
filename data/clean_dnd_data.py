# -*- coding: utf-8 -*-
#clean_dnd_data.py

import pandas as pd
import numpy as np
#from langdetect import detect
from langdetect import DetectorFactory
DetectorFactory.seed = 0
from spacy_langdetect import LanguageDetector
import spacy

# ----- Define language detection functions -----
"""def isFrench(aString):
  if detect(aString) == 'fr':
    return True
  else:
    return False

def isEnglish(aString):
  if detect(aString) == 'en':
    return True
  else:
    return False"""

nlp = spacy.load('en')
nlp.add_pipe(LanguageDetector(), name='language_detector', last=True)

def isFrench(aString):
  doc = nlp(aString)
  detect_language = doc._.language
  if detect_language['language'] == 'fr' and detect_language['score'] >= 0.8:
    return True
  else:
    return False

def isEnglish(aString):
  doc = nlp(aString)
  detect_language = doc._.language
  if detect_language['language'] == 'en' and detect_language['score'] >= 0.8:
    return True
  else:
    return False

# ----- Separate original file into separate language files -----
newDf = pd.read_excel('manabvndataset-abvn.xlsx', index_col=None)

abbrev_eng = newDf['Abbreviation']
term_eng = newDf['Term']
frame_eng = {'Abbreviation': abbrev_eng, 'Term': term_eng}
frame_eng_df = pd.DataFrame(frame_eng)

abbrev_fr = newDf['Abréviation']
term_fr = newDf['Terme']
frame_fr = {'Abréviation': abbrev_fr, 'Terme': term_fr}
frame_fr_df = pd.DataFrame(frame_fr)

print("Initial Length Eng: ", len(frame_eng_df))
print("Initial Length Fr: ", len(frame_fr_df))

# ----- Remove rows with empty abbreviations ----- 
frame_eng_df['Abbreviation'].replace('', np.nan, inplace=True)
frame_eng_df.dropna(subset=['Abbreviation'], inplace=True)
frame_fr_df['Abréviation'].replace('', np.nan, inplace=True)
frame_fr_df.dropna(subset=['Abréviation'], inplace=True)

print("\nLength Eng (Remove Empty Abbreviations): ", len(frame_eng_df))
print("Length Fr (Remove Empty Abbreviations): ", len(frame_fr_df))

# ----- Make sure language is consistent -----
frame_eng_df = frame_eng_df[frame_eng_df['Term'].map(lambda x: isEnglish(x))]
frame_fr_df = frame_fr_df[frame_fr_df['Terme'].map(lambda x: isFrench(x))]

print("\nLength Eng (Filtered Language): ", len(frame_eng_df))
print("Length Fr (Filtered Language): ", len(frame_fr_df))

# ----- Remove duplicate rows -----
frame_eng_df = frame_eng_df.drop_duplicates()
frame_fr_df = frame_fr_df.drop_duplicates()

print("\nLength Eng (Removed Duplicates): ", len(frame_eng_df))
print("Length Fr (Removed Duplicates): ", len(frame_fr_df))

# ----- Export into CSV files -----
frame_eng_df.to_csv('Abbrev_English.csv', index=False)
frame_fr_df.to_csv('Abbrev_French.csv', index=False)
