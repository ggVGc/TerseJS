
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
  rule { $args ...;} => {
    ($args (,) ...);
  }
  rule { $args ... λ $rest...;} => {
    ($args (,) ..., λ $rest...);
  }
  rule { $args ... λ $rest...} => {
    ($args (,) ..., λ $rest...)
  }
  rule { $args ... , $rest...} => {
    ($args (,) ...) ,  $rest...
  }
  rule { $args ... >> $rest...} => {
    ($args (,) ...) >> $rest...
  }
  rule { $args ... | $rest...} => {
    ($args (,) ...) |$rest...
  }
  rule { $args ... $ $rest...} => {
    ($args (,) ...) $ $rest...
  }
  rule { $args ...;.} => {
    ($args (,) ...).
  }
  rule {$args ...} => {
    ($args (,) ...)
  }
}

export (!)



let (<-) = macro{
  case infix { $fn:expr | _ {$body...}} => {
    letstx $expanded = localExpand(#{$body...});
    return #{
     $tupleMap  ($fn) ($expanded)
    }
  }
}
export (<-)
