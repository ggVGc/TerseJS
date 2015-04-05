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
  case infix{ $left:expr | _ $right:expr $r2:expr} => {
    throwSyntaxError('Too many arguments', 'Operator $ only accepts one right-hand argument', stx)
  }
  rule infix{ $left:expr | $right:expr} => {
      $left ($right)
  }
}

export $
