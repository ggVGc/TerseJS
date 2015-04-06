let (!) = macro {
  case infix{ $func:expr | _ $args:expr (,) ...} => {
    return #{$func($args (,) ...);}
  }
}

/*
operator (,,) 5 left { $lhs, $rhs } => #{ $lhs $rhs }
operator (~) 6 left { $lhs, $rhs } => #{ ($lhs,$rhs) }
*/

export (!)
/*
export (,,)
export (~)
*/
