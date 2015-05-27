macro $arr{
  rule{$r:expr ; $rest...}=>{
    $r, $arr $rest...
  }
  rule{$a...}=>{
    $a...
  }
}


macro (array){
  rule{{$contents...}}=>{
    [$arr $contents...];
  }
}


macro (object){
  rule{{$name:ident : $val:expr; $rest...}}=>{
    {$name : $val, object $rest...}
  }
  rule{$name:ident : $val:expr; $rest...}=>{
    $name : $val, object $rest...
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

export (object)
export (array)


