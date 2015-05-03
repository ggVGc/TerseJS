let (|) = macro {
  case { _ $rest...;} => {
    return #{($rest...);}
  }
  case { _ $rest...} => {
    return #{($rest...)}
  }
}
export (|)
