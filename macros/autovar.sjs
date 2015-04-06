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
