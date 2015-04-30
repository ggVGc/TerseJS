let (|) = macro {
  // We need commans to separate arguments, to avoid parsing foo| a (b+c) as a
  // javascript function application
  case infix{ $pre...| _ $rest...;} => {
    return #{$pre... ($rest...);}
  }
  case infix{ $pre... $func| _ $rest...} => {
    return #{$pre... ($rest...)}
  }
}
export (|)
