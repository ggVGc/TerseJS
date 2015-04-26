let (|) = macro {
  // We need commans to separate arguments, to avoid parsing foo| a (b+c) as a
  // javascript function application
  case infix{ $func:expr | _ $rest...;} => {
    return #{$func($rest...);}
  }
  case infix{ $func:expr | _ $rest...} => {
    return #{$func($rest...)}
  }
}
export (|)
