let for = macro{
  rule{global $v:ident=$start $end:expr $step {$body...};}=>{
    for($v=$start;$v<$end;$v+=$step){
      $body...
    }
  }
  rule{global $v:ident=$start $end:expr {$body...};}=>{
    for($v=$start;$v<$end;++$v){
      $body...
    }
  }
  rule{$v:ident=$start $end:expr $step {$body...};}=>{
    var $v;
    for($v=$start;$v<$end;$v+=$step){
      $body...
    }
  }
  rule{$v:ident=$start $end:expr {$body...};}=>{
    var $v;
    for($v=$start;$v<$end;++$v){
      $body...
    }
  }
}

export for
