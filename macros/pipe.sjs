macro $pipe {
  rule { (($val ... )) ($right:expr) } => {
      $right($val ...)
  }
  
  rule { $val ($right:expr) } => {
      $right $val
  }
}


operator (|>) 4 left { $lhs, $rhs } => #{$pipe $lhs $rhs}
export (|>)

