
macro (^){
  rule infix{$pre... | $post...}=>{
    $pre... !$post...
  }
}
export (^)
