macro funHelper{
  case {$ctx $name:ident $args:ident ... {$body ...}} => {
    return #{$name = function($args (,) ...){$body ...};}
  }
  case {$ctx $name:ident.$name2:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$name.$name2 = $fu($args (,) ...){$body ...};}
  }
  rule {$name:ident. $rest...} => {
    $name. funHelper $rest...
  }
}


macro @ {
  case {$ctx fn $rest...} => {
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{$self. funHelper $rest...};
  }
  case {$ctx $args:ident  ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function($args (,) ... ){var $self = {}; $body  ...; return $self;}}
  }

  case {$ctx $name:ident} => {
    letstx $self = [makeIdent('self', #{$ctx})];
     return #{$self.$name};
  }

  case {$ctx} => {
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{$self};
  }
}
export @


macro (@@){
  case {$ctx $name:ident $args:ident  ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function $name($args (,) ... ){var $self = {}; $body  ...; return $self;}}
  }
}

export (@@)


macro fn{
  case {$ctx $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$ctx})];
    return #{$fu $name($args (,) ...){$body ...}}
  }
  rule {$name:ident. $rest...} => {
    $name. funHelper $rest...
  }
}

export (fn)

