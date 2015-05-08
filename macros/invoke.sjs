
macro $removeDoubleBraces{
  rule{(($x...))}=>{
    $removeDoubleBraces ($x...)
  }
  rule{$x...}=>{
    $x...
  }
}

macro $tupleMap{
  rule {($f...) (;)}=>{
    ;
  }
  rule {($f...) ()}=>{
  }
  rule { ($fn) ($tuple...;$rest...)} => {
    $fn $removeDoubleBraces ($tuple...);
    $tupleMap ($fn) ($rest...)
  }
}

// This is special cased to handle being within a precedence block(between pairs of $)
let (!) = macro{
  case infix { $fn:expr | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
     $tupleMap  ($fn) ($expanded)
    }
  }

  rule infix{ $f...|;} => {
    $f...();
  }
  rule infix{ $f...|  $args ... , $rest...} => {
    $f...($args (,) ...) ,  $rest...
  }
  rule infix{ $pre...|  $args ... >> $rest...} => {
    $pre... ($args (,) ...) >> $rest...
  }
  rule infix{ $pre...|  $args ... | $rest...} => {
    $pre... ($args (,) ...) |$rest...
  }
  rule infix{ $f...|  $args ... $ $rest...} => {
    $f...($args (,) ...) $ $rest...
  }
  rule infix{ $f...|  $args ...;} => {
    $f...($args (,) ...);
  }
  case infix{ $f...| _ $args ...} => {
    return #{ ($f...($args (,) ...))}
  }
}

export (!)



/*
let (!) = macro {
  case infix{ $pre... $func:ident| _ $rest } => {
    return #{$pre... $func() $rest}
  }
  case infix{ $pre... $func:ident| _  } => {
    return #{$pre... $func()}
  }
  case infix{ ($stuff...)| _  } => {
    return #{(($stuff...)())}
  }
  rule infix{$pre... | $rest...} => {
    $pre... !$rest...
  }
}

export (!)

macro $tupleMap{
  rule {($f...) (;)}=>{
    ;
  }
  rule {($f...) ()}=>{
  }
  rule { ($fn) ($tuple...;$rest...)} => {
    $fn($tuple(,)...);
    $tupleMap ($fn) ($rest...)
  }
}

// This is special cased to handle being within a precedence block(between pairs of $)
macro (<-) {
  case infix { $fn:expr | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
     $tupleMap  ($fn) ($expanded)
    }
  }
  rule infix{ $f...|  $args ... $ $rest...} => {
    ($f...($args (,) ...)) $ $rest...
  }
  rule infix{ $f...|  $args ...;} => {
    $f...($args (,) ...);
  }
  case infix{ $f...| _ $args ...} => {
    return #{ ($f...($args (,) ...))}
  }
}

export (<-)
*/
