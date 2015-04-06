macro fun{
  case {_ $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$name})];
    return #{$fu $name($args (,) ...){$body ...}}
  }
  case {_ $name:ident.$name2:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$name})];
    return #{$name.$name2 = $fu($args (,) ...){$body ...}}
  }
}


export (fun)
