macro fun{
  case {_ $name:ident $args:ident ...} => {
    letstx $fu = [makeKeyword('function', #{$name})];
    return #{$fu $name($args (,) ...)}
  }
}

export (fun)
