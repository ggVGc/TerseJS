/*
macro pipe {
  rule { (($val ...)) ($prop:ident . $rest ...) } => {
     $prop. pipe ($val...) ($rest...)
  }
  rule { $val ($prop:ident . $rest ...) } => {
     $prop. pipe $val ($rest ...)
  }
  rule { ($val:ident) ($prop:ident()) } => {
      $prop()($val)
  }
  rule { ($val) ($prop:ident()) } => {
      $prop() $val
  }
  rule { $val ($prop:ident()) } => {
      $prop($val)
  }
  rule { (()) ($prop:ident($args:expr (,) ...)) } => {
      $prop($args (,) ... ) 
  }
  rule { (($val ...)) ($prop:ident($args:expr (,) ...)) } => {
      $prop($args (,) ... , $val ...) 
  }
  rule { (($val ... )) ($right:expr) } => {
      $right($val ...)
  }
  rule { $val ($prop:ident) } => {
      $prop $val
  }
  rule { $val ($prop:ident($args:expr (,) ...)) } => {
      $prop($args (,) ... , $val) 
  }
  rule { (($val:expr ... )) ($right:expr) } => {
      $right($val ...)
  }
  
  rule { $val ($right:expr) } => {
      $right $val
  }
}

operator (|>) 4 left { $lhs, $rhs } => #{ pipe $lhs $rhs }

export (|>)
*/

operator (|>) 4 left { $lhs, $rhs } => #{ $rhs($lhs)}
export (|>)
