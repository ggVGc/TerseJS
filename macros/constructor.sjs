
macro (constructor){
  case {$ctx $typeName:ident $args... {$constructorBody...}; $rest... end $endTypeName:ident;}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      var $typeName = {};
      $typeName.create = function($args(,)...){
        var $self = {};
        $rest...
        $constructorBody...
        return $self;
      }
    }
  }
}

export (constructor)


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
