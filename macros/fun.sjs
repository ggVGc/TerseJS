/*
macro fun{
  case {_ $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$name})];
    return #{$fu $name($args (,) ...){autovar{$body ...}}}
  }
}


export (fun)
*/
