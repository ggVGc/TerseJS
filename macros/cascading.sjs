
/*
macro $cascade{
  rule{$name $pre... & $thing...& $rest...}=>{
    $pre...
    $name.$thing...
    $cascade $name & $rest...
  }
  rule{$name & $thing...& $rest...}=>{
    $name.$thing...
    $cascade $name & $rest...
  }
  rule{$name & $thing...}=>{
    $name.$thing...
  }
  rule{$name;}=>{
    
  }
  rule{$all...}=>{
    $all...
  }
}
*/


macro ($){
  rule infix{ $name:expr | {$rest... }} => {
    $name $ $rest...
  }
  rule infix{ $name:expr | $rest... } => {
    macro (..){
      case {$ctx $iname:ident} => {
        return #{ $name.$iname }
      }
      case {$ctx} => {
        return #{
          $name
        }
      }
    }
    $rest...
  }
}



export ($)


  /*
     let (&) = macro {
     case {$ctx {$body ...}} => {
     letstx $obj = [makeIdent("_obj", #{$ctx})];
     return #{function ($obj){$body  ...; return $obj;}}
     }
     case {$ctx $name:ident} => {
     letstx $obj = [makeIdent('_obj', #{$ctx})];
     return #{ $obj.$name }
     }
     case {$ctx} => {
     letstx $obj = [makeIdent('_obj', #{$ctx})];
     return #{
     $obj
     }
     }
     }

*/
