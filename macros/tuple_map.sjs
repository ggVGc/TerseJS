macro (&) {
  rule infix { $fn:expr | {$tuple...;$rest(;)...}} => {
    $fn($tuple...);
    $fn & {$rest(;)...}
  }
  rule infix { $fn:expr | {$tuple...}} => {
    $fn($tuple...)
  }
}


export (&)

