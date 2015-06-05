
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
  rule { ($fn) ($tuple...;;$rest...)} => {
    $tupleMap ($fn) ($tuple...;$rest...)
  }
  rule { ($fn) ($tuple...;$rest...)} => {
    $fn $removeDoubleBraces ($tuple...);
    $tupleMap ($fn) ($rest...)
  }
}

/*
// This is special cased to handle being within a precedence block(between pairs of $)
let (!) = macro{
  rule { ;} => {
    ();
  }
  rule { .} => {
    ().
  }
  rule { *} => {
    ()*
  }
  rule { +} => {
    ()+
  }
  rule {-} => {
    ()-
  }
  rule { $args:expr ... λ $rest...;} => {
    ($args (,) ..., λ $rest...);
  }
  rule { $args:expr ... λ $rest...} => {
    ($args (,) ..., λ $rest...)
  }
  rule { $args:expr ... , $rest...} => {
    ($args (,) ...) ,  $rest...
  }
  rule { $args:expr...;.} => {
    ($args (,) ...).
  }
  rule { $args:expr...;} => {
    ($args (,) ...);
  }
  rule { $args:expr... >> $rest...} => {
    ($args (,) ...) >> $rest...
  }
  rule { $args:expr... | $rest...} => {
    ($args (,) ...) |$rest...
  }
  rule { $args:expr... $ $rest...} => {
    ($args (,) ...) $ $rest...
  }
  rule {$args:expr ...} => {
    ($args (,) ...)
  }
}

export (!)

*/

let (!) = macro{
  rule infix{ $f...| $rest...} => {
    $f...() $rest...
  }
}

export (!)


let (<-) = macro{
  /*
  case infix { $fn:expr | _ $body:expr(,)...} => {
    letstx $expanded = localExpand(#{$body(;)...});
    return #{
     $tupleMap  ($fn) ($expanded;)
    }
  }
  case infix { $fn:expr as $name:ident | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
      var $name = $fn;
     $tupleMap  ($name) ($expanded)
    }
  }
  */
  case infix { $fn:expr | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
     $tupleMap  $fn ($expanded)
    }
  }
}
export (<-)

