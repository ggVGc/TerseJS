macro cascade{
  rule{($decName... ){ $thing...; $rest...} }=>{
    $decName... $thing...; cascade ($decName...){$rest...}
  }
  rule{($decName...){}}=>{
  }
}
export cascade

macro (autovar) {
  rule{($decName...) { global $name:ident:$val:expr; $rest ...} }=>{
    $name = $val; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { var $name:ident:$val:expr; $rest ...} }=>{
    $decName... $name = $val; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { var $name:ident; $rest ...} }=>{
    $decName... $name; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { $name:ident; $rest ...} }=>{
    $decName... $name; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { $name:ident:$val:expr; $rest ...} }=>{
    $decName... $name = $val; autovar ($decName...){$rest ...}
  }
  rule{($decName...) {$ex;$rest ...}}=>{
    $ex; autovar ($decName...){$rest ...}
  }
  rule{($decName...) {; $rest ...}}=>{
    autovar ($decName...){$rest...}
  }
  rule{($decName...) {$rest ...}}=>{
    $rest ...
  }
}

let (var) = macro{
  rule{{$body...}}=>{
    autovar (var) {$body...}
  }
  rule{$e...}=>{
    var $e...
  }
}

export (var);

macro (where){
  rule infix{ var $pre...{$body...};| {$vars...}}=>{
    autovar (var) {$vars...;}
    var $pre...{
      $body...
    }
  }
  rule infix{ $pre...{$body...};| {$vars...}}=>{
    $pre...{
      autovar (var) {$vars...;}
      $body...
    }
  }
  
  rule infix{  $pre... ($thing...); | {$rest...}}=>{
    $pre...
    ($thing... where {$rest...})
  }
  rule infix{  ($thing...) | {$rest...}}=>{
    ($thing... where {$rest...})
  }
  rule infix{  function(){$body ...} $extra... | {$rest...}}=>{
    function(){autovar{$rest...;};$body...;} $extra...
  }
}

export (where)

macro $processFunctions{
  rule{ (constructor $args:ident...{$body...}; $rest...)}=>{ 
    ((constructor($args...){$body...})) ()  ($rest...)
  }
}


macro $bodyHelper{
  rule{($vars...) ($self:ident) ($typeName...) ((constructor ($args...){extends $selfExp:expr; $consBody...}) $funcs...) ($statics...) ($rest...)}=>{
    $bodyHelper ($vars...) ($self = $selfExp) ($typeName...) ((constructor ($args...){$consBody...}) $funcs...) ($statics...) ($rest...)
  }
  rule{($vars...) ($self:ident) ($typeName...) ((constructor ($args...){$consBody...}) $funcs...) ($statics...) ($rest...)}=>{
    $bodyHelper ($vars...) ($self = {}) ($typeName...) ((constructor ($args...){$consBody...}) $funcs...) ($statics...) ($rest...)
  }

  case{$ctx ($vars...) ($self:ident=$selfExp:expr) ($typeName...) ((constructor ( $args...){$consBody...}) $funcs...) ($statics...) ($rest...)}=>{
    return #{
      $typeName... .create = function($args(,)...){
        var $self = $selfExp;
        var{$vars...}
        $rest...
        $consBody...
        return $self;
      };
    }
  }
}

macro (defmod){
  case{$ctx $typeName:ident(.)... ; $pre... constructor $rest... endmodule}=>{
    letstx $expanded = localExpand(#{
        $processFunctions  (constructor $rest...)
    });
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      var $typeName(.)... = {};
      $bodyHelper ($pre...) ($self)($typeName(.)...) $expanded;
    }
    /*
    return #{
      var $typeName(.)...= {};
      cascade ($typeName... .) {$pre...};
      $bodyHelper ($pre...) ($self)($typeName(.)...) $expanded;
    }
    */
  }
  case{$ctx $typeName:ident(.)...; $rest... endmodule}=>{
    letstx $expanded = localExpand(#{
        $processFunctions  ($rest...)
    });
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      var $typeName(.)... = {};
      $bodyHelper () ($self)($typeName(.)...) $expanded;
    }
  }
}

export (defmod)




