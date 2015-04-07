let ($) = macro {
  case infix{ $func:expr | _ $args:expr (,) ...} => {
    return #{$func($args (,) ...)}
  }
}

let (!) = macro {
  case infix{ $func:expr | _ $rest } => {
    return #{$func() $rest}
  }
}




export ($)
export (!)
