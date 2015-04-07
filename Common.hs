module Common where

removeSpaces::String->String
removeSpaces (x:xs)
  | x==' '      =removeSpaces xs
  | otherwise   = x:(removeSpaces xs)
removeSpaces [] = []
