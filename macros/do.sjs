macro do{
  rule { ! {$body... ; $last:expr;}} => {
    (function(){$body...;return $last;}())
  }
  rule { {$body ... }} => {
    (function(){$body ...}())
  }
}

export (do)
