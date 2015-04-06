macro @ {

  case {$ctx $args:ident (,) ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function($args (,) ... ){var $self = {}; $body  ...; return $self;}}
  }
  case {$ctx fun $name:ident $args:ident ...} => {
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{$self.$name = function($args (,) ...)};
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

