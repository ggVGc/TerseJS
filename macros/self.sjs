macro @ {
  case {_ fun $name:ident $args:ident ...} => {
    letstx $self = [makeIdent('self', #{$name})];
    return #{$self.$name = function($args (,) ...)};
  }
  case {_ $val:ident} => {
    letstx $self = [makeIdent('self', #{$val})];
     return #{$self.$val};
  }
  rule {} => {
     self
  }
}

export @

