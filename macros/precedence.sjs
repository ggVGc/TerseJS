/*
macro ($){
  case infix{  $a... | _ $b... $ $lol...} => {
    return #{ (($a...)($b...)) $ $lol...}
  }
  case { _ $args ... $ $rest...;} => {
    return #{ (($args (,) ...) $ $rest...); }
  }
  case { _ $args ... $ $rest...} => {
    return #{ (($args (,) ...) $ $rest...) }
  }
  case { _ $args ...;} => {
    return #{ (($args (,) ...)); }
  }
  case { _ $args ...} => {
    return #{ (($args (,) ...)) }
  }
}
export ($)

*/
/*

macro ($){
  case infix{  $a... | _ $b... $ $rest...} => {
    return #{ (($a...)($b...)) $ $rest...}
  }
  case {  _ $a...;} => {
    return #{ ($a...); }
  }
  case {  _ $a...} => {
    return #{ (bahjs) }
  }
}
export ($)
*/
/*

macro ($){
  rule infix{  $a... | $b... $[$] $rest...; } => {
    ($a...,$b... $ $rest...);
  }
  rule infix{  $a... | $b... $[$] $rest... } => {
    $a...,$b... $ $rest...
  }
  rule {  $a... ;} => {
    ,($a...);
  }
  rule {  $a... } => {
    ,($a...)
  }
}
export ($)
*/



let ($) = macro{
  case infix{  $a... | _ $b... } => {
    letstx $exA = localExpand(#{$a...});
    letstx $exB= localExpand(#{$b...});
    return #{
      $exA $exB
    }
  }
}
export ($)
