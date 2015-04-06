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

indentOutString = "{ autovar{"
dedentOutString = "}};"

data Tree = Node [Tree] | Leaf String
  deriving (Show)

transformTree :: Tree -> Tree
transformTree (Node (Leaf a:Leaf b:rest)) = transformTree $ Node (Leaf(a++" "++b):rest)
transformTree (Node children) = Node (map transformTree children)
transformTree tree = tree

flattenNodes :: Tree -> Tree
flattenNodes (Node (Leaf lf:Node n:rest)) = flattenNodes $ Node (Leaf  "__$$INDENT$$__":Leaf lf:Node n:rest<>[Leaf "__$$DEDENT$$__"])
flattenNodes (Node children) = Node (map flattenNodes children)
flattenNodes tree = tree

showIndent indLevel = concat $ replicate indLevel "  "

showTreeRec indLevel (Node (Leaf "__$$INDENT$$__":Leaf lf:children)) = "\n" <> showIndent indLevel <> lf <> indentOutString <>concatMap(showTreeRec (indLevel+1)) children
showTreeRec indLevel (Node children) = "\n" <> showIndent indLevel <> concatMap (showTreeRec (indLevel+1)) children
showTreeRec indLevel (Leaf "__$$DEDENT$$__")     = "\n"++ showIndent (indLevel-1)  ++dedentOutString++""
showTreeRec _ (Leaf text)     = text <> " "

showTree tree = drop 2 $ showTreeRec (-1) tree

aTree = Node <$> many aNode
aNode = spaces *> withBlock makeNode aNodeHeader aNode
aNodeHeader = many1 aLeaf <* spaces
aLeaf = Leaf <$> (many1 (satisfy (not . isSpace)) <* many (oneOf " \t"))
makeNode leaves nodes = Node $ leaves <> nodes

example = unlines [
    "lorem ipsum",
    "dolor1",
    "dolor2",
    "    ",
    "    dolor3",
    "    sit amet",
    "    consectetur",
    "        adipiscing elrt dapibus",
    "        Ho ho ho ho",
    "    sodales",
    "urna",
    "    facilisis"
  ]

{-insertEmptyLineComments = -}


parseIndentedTree input = runIndent "" $ runParserT aTree () "" input

main = do
    args <- getArgs
    input <- if null args then return example else readFile $ head args
    let parsedTree = transformTree $ forceEither $ parseIndentedTree input
    let flattened = flattenNodes $ transformTree parsedTree
    {-putStrLn "Parsed"-}
    {-putStrLn $ PR.ppShow parsedTree-}
    {-putStrLn "\nFlattened"-}
    {-putStrLn $ PR.ppShow flattened-}
    {-putStrLn "\nOut"-}
    putStrLn $ showTree flattened
