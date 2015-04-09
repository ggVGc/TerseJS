module Common where

emptyLineComment = "/*___EMPTY_LINE_PLACEHOLDER_HOPE_NOTHING_CLASHES___*/"


removeSpaces::String->String
removeSpaces (x:xs)
  | x==' '      =removeSpaces xs
  | otherwise   = x:(removeSpaces xs)
removeSpaces [] = []
