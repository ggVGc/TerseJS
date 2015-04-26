macro ($){
  case { _ $f:ident $args ... $ $f2:ident $rest...;} => {
    return #{ ($f($args (,) ...), $ $f2 $rest...); }
  }
  case { _ $f:ident $args ... $ $f2:ident $rest...} => {
    return #{ ($f($args (,) ...), $ $f2 $rest...) }
  }
  case { _ $f:ident $args ...;} => {
    return #{ ($f($args (,) ...)); }
  }
  case { _ $f:ident $args ...} => {
    return #{ ($f($args (,) ...)) }
  }
}
export ($)
