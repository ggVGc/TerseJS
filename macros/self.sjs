macro funHelper{
  case {$ctx $name:ident $args:ident ... {$body ...}} => {
    return #{$name = function($args (,) ...){$body ...}}
  }
  case {$ctx $name:ident.$name2:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$name.$name2 = $fu($args (,) ...){$body ...}}
  }
  rule {$name:ident. $rest...} => {
    $name. funHelper $rest...
  }
}


macro @ {
  case {$ctx $args:ident  ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function($args (,) ... ){var $self = {}; $body  ...; return $self;}}
  }

  case {$ctx fun $rest...} => {
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{$self. funHelper $rest...};
  }

  case {$ctx $val:ident} => {
    letstx $self = [makeIdent('self', #{$ctx})];
     return #{$self.$val};
  }


  rule {} => {
     self
  }
}
export @


macro fun{
  case {$ctx $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$fu $name($args (,) ...){$body ...}}
  }
  rule {$name:ident. $rest...} => {
    $name. funHelper $rest...
  }
}

export (fun)

