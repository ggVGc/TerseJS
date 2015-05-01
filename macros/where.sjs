macro (autovar) {
  rule{{ global $name:ident=$val:expr; $rest ...} }=>{
    $name = $val; autovar{$rest ...}
  }
  rule{{ var $name:ident=$val:expr; $rest ...} }=>{
    var $name = $val; autovar{$rest ...}
  }
  rule{{ var $name:ident; $rest ...} }=>{
    var $name; autovar{$rest ...}
  }
  rule{{ $name:ident; $rest ...} }=>{
    var $name; autovar{$rest ...}
  }
  rule{{ $name:ident=$val:expr; $rest ...} }=>{
    var $name = $val; autovar{$rest ...}
  }
  rule{{$ex;$rest ...}}=>{
    $ex; autovar{$rest ...}
  }
  rule{{; $rest ...}}=>{
    autovar{$rest...}
  }
  rule{{$rest ...}}=>{
    $rest ...
  }
}

let (var) = macro{
  rule{{$body...}}=>{
    autovar{$body...}
  }
  rule{$e...}=>{
    var $e...
  }
}

export (var);

macro (where){
  rule infix{ $pre...{$body...};| {$vars...}}=>{
    $pre...{
      autovar{$vars...}
      $body...
    }
  }
  
  rule infix{  $pre... ($thing...); | {$rest...}}=>{
    $pre...
    ($thing... where {$rest...})
  }
  rule infix{  ($thing...) | {$rest...}}=>{
    ($thing... where {$rest...})
  }
  rule infix{  function(){$body ...} $extra... | {$rest...}}=>{
    function(){autovar{$rest...};$body...;} $extra...
  }
}

export (where)
