let (|) = macro {
  // We need commans to separate arguments, to avoid parsing foo| a (b+c) as a
  // javascript function application
  case infix{ $func:expr | _ $args:expr (,) ...} => {
    return #{$func($args (,) ...)}
  }
}
export (|)
