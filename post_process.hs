removeSpaces::String->String
removeSpaces (x:xs)
  | x==' '      =removeSpaces xs
  | otherwise   = x:(removeSpaces xs)
removeSpaces [] = []

removeLonelySemicolons::[String] -> [String]
removeLonelySemicolons (x:xx:xs)
  | removeSpaces x==";" && removeSpaces xx=="}"= removeLonelySemicolons (xx:xs)
  | removeSpaces x==";" && removeSpaces xx=="};"= removeLonelySemicolons (xx:xs)
  | removeSpaces x==";" = "":removeLonelySemicolons (xx:xs)
  | otherwise = x:(removeLonelySemicolons $ xx:xs)
removeLonelySemicolons lines = lines


main = do
    content <- getContents
    let processed = removeLonelySemicolons $ lines content
    putStrLn $ unlines processed
