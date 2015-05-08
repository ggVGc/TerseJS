
macro $makeRecord{
  rule{($typeName) ($self) ($x:ident :+ $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $self.$name = function(){
      $body...
    };
    $makeRecord ($typeName) ($self) ($rest...)
  }
  rule{($typeName) ($self) ($x:ident :- $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    function $name($args(,)...){
      $body...
    };
    $makeRecord ($typeName) ($self) ($rest...)
  }
  rule{($typeName) ($self) ($content...)}=>{ 
  }
}
macro (constructor){
  case {$ctx $typeName:ident $args... {$vars... endvars $constructorBody...}; $rest... end $endTypeName:ident;}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      var $typeName = {};
      $typeName.create = function($args(,)...){
        var $self = {};
        var{$vars...}
        $makeRecord ($typeName) ($self) ($rest...)
        $constructorBody...
        return $self;
      }
    }
  }
}

export (constructor)


/*
macro (:+){
  case infix{$typeName:ident | $ctx $name $args... {$body...};}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      $self.$name = function($args(,)...){
        $body...
      }
    }
  }
}

export (:+)


macro (:-){
  case infix{$typeName:ident | $ctx $name $args...{$body...};}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      function $name($args(,)...){
        $body...
      }
    }
  }
}

export (:-)
*/
