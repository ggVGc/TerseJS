
macro (^){
  rule infix{$pre... | $post...}=>{
    $pre... !$post...
  }
}
export (^)

operator (^=) 4 left { $lhs, $rhs } => #{ $lhs != $rhs}
export (^=)
