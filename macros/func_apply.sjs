/*
let ($) = macro {
  rule infix{ $fun | $args:expr (,) ... } => {
      $fun($args (,) ... ) 
  }
}
*/

//macro ($){
  //rule { $args:expr (,) ... } => {
    //($args (,) ...)
  //}
//}

let ($) = macro {
  rule infix{ $left:expr | $right:expr ... } => {
      $left ($right (,) ...)
  }
}

export $
