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

let (if) = macro {
  rule { $cond:expr} => {
      if ($cond)
  }
}
let (while) = macro {
  rule { $cond:expr} => {
      while ($cond)
  }
}

export if
export while

