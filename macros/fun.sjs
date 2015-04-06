/*
macro fun{
  case {$ctx $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$fu $name($args (,) ...){$body ...}}
  }
  case {$ctx $name:ident.$name2:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$name.$name2 = $fu($args (,) ...){$body ...}}
  }
  rule {$name:ident. $rest...} => {
    $name. fun $rest...
  }
}


export (fun)
*/
