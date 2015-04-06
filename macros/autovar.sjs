macro (autovar) {
  rule{{ global $name:ident=$val:expr; $rest ...} }=>{
    $name = $val; autovar{$rest ...}
  }
  rule{{ var $name:ident=$val:expr; $rest ...} }=>{
    var $name = $val; autovar{$rest ...}
  }
  rule{{ $name:ident=$val:expr; $rest ...} }=>{
    var $name = $val; autovar{$rest ...}
  }
  rule{{$ex;$rest ...}}=>{
    $ex; autovar{$rest ...}
  }
  rule{{$rest ...}}=>{
    $rest ...
  }
}
export (autovar);

macro fun{
  case {_ $name:ident $args:ident ... {$body ...}} => {
    letstx $fu = [makeKeyword('function', #{$name})];
    return #{$fu $name($args (,) ...){autovar{$body ...}}}
  }
}
export (fun)

//scope
macro ($){
  case {$ctx $args:ident (,) ...{$body ...}} => {
    var self = makeIdent("self", #{$ctx});
    letstx $self = [self];
    return #{function($args (,) ... ){var $self = {}; autovar{$body  ...}}}
  }
}
export ($)

macro do{
  rule { {$body ... }} => {
    (function(){$body ...}())
  }
}

export (do)
