// Create unbound functions 
var add = λ(x, y) -> x + y
add(1, 2) === 3

// Chain calls
10 |> foo |> mulBy(2) |> console.log

// Create bound functions 
DB.getResource('foo', λ(err, resp) =>
  if (err)
    err |> prettify |> console.log
)
 
// Curry functions by leaving off the tupled arguments 
var always = λ x y -> x
always(42)(12) === 42
 
// Mix and match for multiple argument lists 
var nonsense = λ(x, y)(s, t) f -> 42
 
// Placeholders using square brackets and `#` 
var str = λ[#.toString()]
var sub = λ[# - #]
sub(2, 1) === 1
 
// Shorthand property lambdas 
var names = arr.map(λ.name)

var foo = λ(start)->
  c = start
  return λ->
    ++c
    console.log(c)

