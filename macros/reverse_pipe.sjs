let (|) = macro {
  // We need commans to separate arguments, to avoid parsing foo| a (b+c) as a
  // javascript function application
  case { _ $rest...;} => {
    return #{($rest...);}
  }
  case { _ $rest...} => {
    return #{($rest...)}
  }
}
export (|)
