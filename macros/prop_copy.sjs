macro (:=){
  rule infix { $name:expr {$prop} | $other:expr } => {
    $name . $prop = $other . $prop;
  }
  rule infix { $name:expr {$prop $restProps ...} | $other:expr } => {
    $name . $prop = $other . $prop;
    $name {$restProps ...} := $other;
  }
}
export (:=)

/*
macro (::){
  rule infix { $name:expr | {$prop..., $restProps...} } => {
    $name . $prop..., $name :: {$restProps...}
  }
  rule infix { $name:expr | {$prop...}}=> {
    $name . $prop...
  }
}

export (::)
*/
