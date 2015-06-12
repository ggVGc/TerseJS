
macro $forBody{
  rule{$v=$start,$end,(-$step)}=>{
    $v=$start;$v>=$end;$v-=$step
  }
  rule{$v=$start,$end,$step}=>{
    $v=$start;$v<$end;$v+=$step
  }
}


let for = macro{
  rule{$v:ident in  $e:expr {$body...};}=>{
    for($v in $e){
      if($e.hasOwnProperty($v)){
        $body...
      }
    }
  }
  rule{global $v:ident=$start:expr, $end:expr, $step:expr {$body...};}=>{
    for($forBody $v=$start,$end,$step){
      $body...
    }
  }
  rule{global $v:ident=$start:expr, $end:expr {$body...};}=>{
    for($v=$start;$v<$end;++$v){
      $body...
    }
  }
  rule{$v:ident=$start:expr, $end:expr, $step:expr {$body...};}=>{
    var $v;
    for($forBody $v=$start,$end,$step){
      $body...
    }
  }
  rule{$v:ident=$start:expr, $end:expr {$body...};}=>{
    var $v;
    for($v=$start;$v<$end;++$v){
      $body...
    }
  }
}

export for
