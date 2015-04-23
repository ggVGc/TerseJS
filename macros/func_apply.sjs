


let (|) = macro {
  // We need commans to separate arguments, to avoid parsing foo| a (b+c) as a
  // javascript function application
  case infix{ $func:expr | _ $args:expr (,) ...} => {
    return #{$func($args (,) ...)}
  }
}

let (!) = macro {
  case infix{ $pre... $func| _ $rest } => {
    return #{$pre... $func() $rest}
  }
  rule {$fallThrough} => {
    !$fallThrough
  }
}




export (|)
export (!)
