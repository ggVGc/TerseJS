/*
let ($) = macro {
  rule infix{ $fun | $args:expr (,) ... } => {
      $fun($args (,) ... ) 
  }
}
*/

macro ($){
  rule { $args:expr (,) ... |>} => {
    ($args (,) ...)
  }
}
export $
