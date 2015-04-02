import Control.Applicative
import Data.Char (isSpace)
import Data.Either.Utils (forceEither)
import Data.Monoid
import System.Environment (getArgs)
import Text.Parsec hiding (many, optional, (<|>))
import Text.Parsec.Indent
import Data.List
import Data.List.Utils
import qualified Text.Show.Pretty as PR

data Tree = Node [Tree] | Leaf String
  deriving (Show)

transformTree :: Tree -> Tree
transformTree (Node (Leaf a:Leaf b:rest)) = transformTree $ Node (Leaf(a++" "++b):(rest))
transformTree (Node children) = Node (map transformTree children)
transformTree tree = tree

flattenNodes :: Tree -> Tree
flattenNodes (Node (Leaf lf:(Node n):rest)) = flattenNodes $ Node (Leaf "INDENT":Leaf lf:Node n:rest<>[Leaf "DEDENT"])
flattenNodes (Node children) = Node (map flattenNodes children)
flattenNodes tree = tree

showTreeRec indCount (Node (Leaf "INDENT":Leaf lf:children)) = "\n" <> (concat $ replicate indCount "  ") <> lf <> "{"<>(concat $ map (showTreeRec (indCount+1)) children)
showTreeRec indCount (Node (children)) = "\n" <> (concat $ replicate indCount "  ") <> (concat $ map (showTreeRec (indCount+1)) children)
showTreeRec indCount (Leaf "DEDENT")     = "\n"++(concat $ replicate (indCount-1) "  ")  ++"}\n"
showTreeRec _ (Leaf text)     = text <> " "

showTree tree = drop 2 $ showTreeRec (-1) tree

aTree = Node <$> many aNode
aNode = spaces *> withBlock makeNode aNodeHeader aNode
aNodeHeader = many1 aLeaf <* spaces
aLeaf = Leaf <$> (many1 (satisfy (not . isSpace)) <* many (oneOf " \t"))
makeNode leaves nodes = Node $ leaves <> nodes

example = unlines [
    "AAA",
    "  BBB",
    "    CCC"
  ]

parseIndentedTree input = runIndent "" $ runParserT aTree () "" input

main = do
    args <- getArgs
    input <- if null args then return example else readFile $ head args
    let parsedTree = transformTree $ forceEither $ parseIndentedTree input
    let flattened = flattenNodes $ transformTree $ parsedTree
    {-putStrLn "Parsed"-}
    {-putStrLn $ PR.ppShow parsedTree-}
    {-putStrLn "\nFlattened"-}
    {-putStrLn $ PR.ppShow flattened-}
    {-putStrLn "\nOut"-}
    putStrLn $ showTree flattened
