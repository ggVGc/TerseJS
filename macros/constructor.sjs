
macro $makeRecord{
  rule{($typeName) ($self) ($x:ident(.)... public $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $self.$name = function(){
      $body...
    };
    $makeRecord ($typeName) ($self) ($rest...)
  }
  rule{($typeName) ($self) ($x:ident(.)... private $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    function $name($args(,)...){
      $body...
    };
    $makeRecord ($typeName) ($self) ($rest...)
  }
  rule{($typeName) ($self) ($content...)}=>{ 
  }
}


macro $selfAssign{
  rule {$self{var{$self = $e:expr; $restVars...} $body...}}=>{
    var $self = $e;
    var{$restVars...}
    $body...
  }
  rule {$self{$body...}}=>{
    var $self = {};
    $body...
  }
}


macro (constructor){
  case{$ctx $pre... . $typeName:ident $args:ident... {$vars... endvars $constructorBody...}; $rest... end $endTypeName:ident(.)...;}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      $pre... . $typeName = {};
      $pre... . $typeName.create = function($args(,)...){
        $selfAssign $self{
        var{$vars...}
        $makeRecord ($typeName) ($self) ($rest...)
        $constructorBody...
        return $self;
        }
      }
    }
  }
  case {$ctx $typeName:ident $args... {$vars... endvars $constructorBody...}; $rest... end $endTypeName:ident(.)...;}=>{
    var $typeName = {};
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
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
