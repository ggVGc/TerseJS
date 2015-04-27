let (if) = macro {
  rule { $cond:expr {$body...};else} => {
      if ($cond){
        $body...
      }else
  }
  rule { $cond:expr} => {
      if ($cond)
  }
}
let (while) = macro {
  rule { $cond:expr} => {
      while ($cond)
  }
}

export if
export while

