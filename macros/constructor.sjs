
macro $makeRecord{
  rule{ ($self) ($x:ident(.)... public $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $self.$name = function(){
      $body...
    };
    $makeRecord  ($self) ($rest...)
  }
  rule{ ($self) ($x:ident(.)... private $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    function $name($args(,)...){
      $body...
    };
    $makeRecord  ($self) ($rest...)
  }
  rule{ ($self) ($content...)}=>{ 
  }
}


macro $makeBody{
  rule {($self:ident) ($typeName...) ($args...) (extends $extExpr:expr $vars...) ($body...) ($rest...)}=>{
    $makeBody ($self = $extExpr)  ($typeName...) ($args...) ($vars...) ($body...) ($rest...)
  }
  rule {($self:ident) ($typeName...) ($args...) ($vars...) ($body...) ($rest...)}=>{
    $makeBody ($self = {})  ($typeName...) ($args...) ($vars...) ($body...) ($rest...)
  }
  rule {($self:ident = $selfExpr:expr) ($typeName...) ($args...) ($vars...) ($body...) ($rest...)}=>{
    $typeName... .create = function($args(,)...){
      var $self = $selfExpr;
      var{$vars...}
      $makeRecord  ($self) ($rest...)
      $body...
      return $self;
    }
  }
}


macro (constructor){
  case{$ctx $pre... . $typeName:ident $args:ident... {$vars... endvars $constructorBody...}; $rest... end $endTypeName:ident(.)...;}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      $pre... . $typeName = {};
      $makeBody ($self) ($pre... . $typeName) ($args...) ($vars...) ($constructorBody...) ($rest...)
    }
  }
  case {$ctx $typeName:ident $args... {$vars... endvars $constructorBody...}; $rest... end $endTypeName:ident(.)...;}=>{
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      var $typeName = {};
      $makeBody ($self) ($typeName) ($args...) ($vars...) ($constructorBody...) ($rest...)
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
