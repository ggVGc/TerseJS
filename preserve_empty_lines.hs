import Data.Char (isSpace)
import Data.List (intercalate)
import Data.String.Utils (replace)
import System.Environment (getArgs)
import Common



leadingSpaces::String->String
leadingSpaces str = takeWhile isSpace str

removeComments::[String]->[String]
removeComments (x:xs)
  | removeSpaces x==emptyLineComment = (leadingSpaces x):(removeComments xs)
  | otherwise = x:(removeComments xs)
removeComments []=[]

addCommentToEmptyLines::[String] -> [String]
addCommentToEmptyLines (x:xx:xs)
  | removeSpaces xx=="" = x:addCommentToEmptyLines ((leadingSpaces x++emptyLineComment):xs)
  | otherwise = x:addCommentToEmptyLines (xx:xs)
addCommentToEmptyLines lines = lines

stripAllComments::[String]->[String]
stripAllComments (x:xs) = (replace emptyLineComment "" x):stripAllComments xs
stripAllComments [] = []

main = do
    args <- getArgs
    content <- getContents
    let action = if (intercalate "" args)=="-r" then removeComments else addCommentToEmptyLines
    let processed = action $ reverse $ lines content
    putStrLn $ unlines $ stripAllComments $ reverse processed
