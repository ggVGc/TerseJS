
macro $tupleMap{
  rule {($f...) (;)}=>{
    ;
  }
  rule {($f...) ()}=>{
  }
  rule { ($fn) ($tuple...;$rest...)} => {
    $fn($tuple...);
    $tupleMap ($fn) ($rest...)
  }
}

macro (<-) {

  case infix { $fn:expr | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
     $tupleMap  ($fn) ($expanded)
    }
  }
}


export (<-)

