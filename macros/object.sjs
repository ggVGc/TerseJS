macro ~{
  rule{{$name:ident : $val:expr; $rest...}}=>{
    {$name : $val, ~$rest...}
  }
  rule{$name:ident : $val:expr; $rest...}=>{
    $name : $val, ~$rest...
  }
  rule{$name:ident : $val:expr;}=>{
    $name : $val
  }
  rule{$name:ident : $val:expr}=>{
    $name : $val
  }
  rule{}=>{
    
  }
}

export ~
