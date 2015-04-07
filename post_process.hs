removeSpaces::String->String
removeSpaces (x:xs)
  | x==' '      =removeSpaces xs
  | otherwise   = x:(removeSpaces xs)
removeSpaces [] = []

removeLonelySemicolons::[String] -> [String]
removeLonelySemicolons (x:xs)
  | removeSpaces x==";" = removeLonelySemicolons xs
  | otherwise = x:(removeLonelySemicolons xs)
removeLonelySemicolons lines = lines

main = do
    content <- getContents
    let processed = removeLonelySemicolons $ lines content
    putStrLn $ unlines processed
