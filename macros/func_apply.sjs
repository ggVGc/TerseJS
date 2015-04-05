let (!) = macro {
  case infix{ $func:expr | _ $args:expr ...} => {
    return #{$func($args (,) ...)}
  }
}

export (!)
