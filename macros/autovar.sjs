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
