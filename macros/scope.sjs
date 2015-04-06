/*
macro scope{
  case {$ctx _$name:ident $args:ident ... {$body ...}} => {
    letstx $funDec = #{function $name($args (,) ... )};
    letstx $self = [makeIdent('self', #{$name})];
    var bod = #{var $self = {}; $body ...; return $self;};
    letstx $outBod = [makeDelim('{}', bod, #{name})];
    return #{$funDec $outBod};
  }
}
*/

/*
macro ($){
  case {$ctx $args:ident (,) ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function($args (,) ... ){var $self = {}; autovar{$body  ...}}}
  }
}

export ($)
*/
