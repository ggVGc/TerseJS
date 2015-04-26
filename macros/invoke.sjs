let (!) = macro {
  case infix{ $pre... $func:ident| _ $rest } => {
    return #{$pre... $func() $rest}
  }
  case infix{ $pre... $func:ident| _  } => {
    return #{$pre... $func()}
  }
  case infix{ ($stuff...)| _  } => {
    return #{(($stuff...)())}
  }
  rule infix{$pre... | $rest...} => {
    $pre... !$rest...
  }
}

export (!)


