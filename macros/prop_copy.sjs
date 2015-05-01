macro (:=){
  /*
  rule infix { $name:expr {$props(,)...} | $other:expr, $others(,)...; } => {
    $name {$props(,)...} := {$other, $others(,)...}
  }
  */

  rule infix { $name:expr {$props(,)...} | {$restOthers:expr(,)...;} } => {
    $name {$props(,)...} := {$restOthers(,)...}
  }
  rule infix { $name:expr {$prop, $restProps(,)...} | {$other:expr, $restOthers:expr(,)...} } => {
    $name . $prop = $other;
    $name {$restProps(,)...} := {$restOthers(,)...}
  }

  rule infix { $name:expr {$prop} | {$other:expr} } => {
    $name . $prop = $other;
  }
  rule infix { $name:expr {$prop} | $other:expr } => {
    $name . $prop = $other . $prop;
  }
  rule infix { $name:expr {$prop, $restProps(,)...} | $other:expr } => {
    $name . $prop = $other . $prop;
    $name {$restProps(,)...} := $other;
  }
}
export (:=)

macro (::){
  rule infix { $name:expr | {$prop...;, $restProps...} } => {
    $name . $prop..., $name :: {$restProps...}
  }
  rule infix { $name:expr | {$prop..., $restProps...} } => {
    $name . $prop..., $name :: {$restProps...}
  }
  rule infix { $name:expr | {$prop...;}}=> {
    $name . $prop...
  }
  rule infix { $name:expr | {$prop...}}=> {
    $name . $prop...
  }
}

//macro ($pull){
  //rule { ($name:expr) ({$prop..., $restProps...}) } => {
    //$name . $prop..., $pull ($name) ({$restProps...})
  //}
  //rule { ($name:expr) ({$prop...})}=> {
    //$name . $prop...
  //}
//}


//operator (::) 4 left { $lhs, $rhs } => #{$pull $lhs $rhs}

export (::)
