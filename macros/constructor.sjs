
macro $processStatics{
  rule{($typeName...) $name:ident $args...{$body...} $rest...}=>{
    $typeName... .$name = function($args(,)...){$body...};
  }
  rule{$a...}=>{
    foo
  }
}

macro $processFunctions{
  rule{ ($statics...) ($self) ($x:ident(.)... static $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($statics... $name $args...{$body...}) ($self) ($rest...)
  }

  rule{ ($statics...) ($self) ($x:ident(.)... public $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $self.$name = function(){
      $body...
    };
    $processFunctions  ($statics...) ($self) ($rest...)
  }

  rule{ ($statics...) ($self) ($x:ident(.)... local $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    function $name($args(,)...){
      $body...
    };
    $processFunctions  ($statics...) ($self) ($rest...)
  }
  rule{ ($statics...)($self) ($content...)}=>{ 
    statics($statics...)
  }
}


macro $bodyHelper{
  rule{($typeName...)($args...) $pre... statics($statics...) $post...}=>{
    $typeName... = function($args(,)...){
      $pre...
      $post...
    }
    $processStatics ($typeName...) $statics...
  }
}

macro $makeBody{
  rule {($self:ident) ($typeName...) ($args...) (extends $extExpr:expr $vars...) ($body...) ($rest...)}=>{
    $makeBody ($self = $extExpr)  ($typeName...) ($args...) ($vars...) ($body...) ($rest...)
  }
  rule {($self:ident) ($typeName...) ($args...) ($vars...) ($body...) ($rest...)}=>{
    $makeBody ($self = {})  ($typeName...) ($args...) ($vars...) ($body...) ($rest...)
  }
  case {_ ($self:ident = $selfExpr:expr) ($typeName...) ($args...) ($vars...) ($body...) ($rest...)}=>{
    letstx $expanded = localExpand(#{
        var $self = $selfExpr;
        var{$vars...}
        $processFunctions  () ($self) ($rest...)
        $body...
        return $self;
    });
    return #{
      $typeName... .create = $bodyHelper ($typeName...)($args...) $expanded
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
