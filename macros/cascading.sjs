
macro $cascade{
  rule{$name $pre... # $thing...# $rest...}=>{
    $pre...
    $name.$thing...
    $cascade $name # $rest...
  }
  rule{$name # $thing...# $rest...}=>{
    $name.$thing...
    $cascade $name # $rest...
  }
  rule{$name # $thing...}=>{
    $name.$thing...
  }
  rule{$name;}=>{
    
  }
  rule{$all...}=>{
    nooope;
  }
}


let (&) = macro {
  case infix{ $name:expr | _ {$rest... }} => {
    return #{$cascade $name $rest...}
  }
}

export (&)
