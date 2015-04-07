import Data.Char (isSpace)
import Data.List (intercalate)
import System.Environment (getArgs)
import Common


commentContent = "/*___EMPTY_LINE_PLACEHOLDER_HOPE_NOTHING_CLASHES___*/"

leadingSpaces::String->String
leadingSpaces str = takeWhile isSpace str

removeComments::[String]->[String]
removeComments (x:xs)
  | removeSpaces x==commentContent = (leadingSpaces x):(removeComments xs)
  | otherwise = x:(removeComments xs)
removeComments []=[]

addCommentToEmptyLines::[String] -> [String]
addCommentToEmptyLines (x:xx:xs)
  | removeSpaces xx=="" = x:addCommentToEmptyLines ((leadingSpaces x++commentContent):xs)
  | otherwise = x:addCommentToEmptyLines (xx:xs)

addCommentToEmptyLines lines = lines

main = do
    args <- getArgs
    content <- getContents
    let action = if (intercalate "" args)=="-r" then removeComments else addCommentToEmptyLines
    let processed = action $ lines content
    putStrLn $ unlines processed
