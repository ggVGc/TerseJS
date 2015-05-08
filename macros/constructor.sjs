
macro $processStatics{
  rule{($typeName...) $name:ident $args...{$body...} $rest...}=>{
    $typeName... .$name = function($args(,)...){$body...};
    $processStatics ($typeName...) $rest...
  }
  rule{($typeName...) }=>{
  }
}

macro $processFunctions{
  rule{ ($funcs...) ($statics...)  (constructor $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs... (constructor($args...){$body...})) ($statics...)  ($rest...)
  }

  rule{ ($funcs...) ($statics...)  ($x:ident(.)... static $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs...) ($statics... $name $args...{$body...})  ($rest...)
  }

  rule{ ($funcs...) ($statics...)  ($x:ident(.)... public $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs... (public $name ($args...){$body...})) ($statics...)  ($rest...)
  }

  rule{ ($funcs...) ($statics...)  ($x:ident(.)... local $name:ident $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs... (local $name ($args...){$body...})) ($statics...)  ($rest...)
  }
  rule{ ($funcs...) ($statics...) ($content...)}=>{ 
    ($funcs...) ($statics...)
  }
}


macro $buildBody{
  rule{$self:ident (local $name:ident ($args...){$body...}) $rest...;}=>{
    function $name($args(,)...){
      $body...
    };
    $buildBody $self $rest...;
  }
  rule{$self:ident (public $name:ident ($args...){$body...}) $rest...;}=>{
    $self.$name = function($args(,)...){
      $body...
    };
    $buildBody $self $rest...;
  }
  rule{$self $all...}=>{
    $all...
  }
}

macro $bodyHelper{
  rule{($self:ident) ($typeName...) ((constructor ($args...){$vars... extends $selfExp:expr; endvars $consBody...}) $funcs...) ($statics...)}=>{
    $bodyHelper ($self = $selfExp) ($typeName...) ((constructor ($args...){$vars... endvars $consBody...}) $funcs...) ($statics...)
  }
  rule{($self:ident) ($typeName...) ((constructor ($args...){$vars... endvars $consBody...}) $funcs...) ($statics...)}=>{
    $bodyHelper ($self = {}) ($typeName...) ((constructor ($args...){$vars... endvars $consBody...}) $funcs...) ($statics...)
  }

  case{$ctx ($self:ident=$selfExp:expr) ($typeName...) ((constructor ($args...){$vars... endvars $consBody...}) $funcs...) ($statics...)}=>{
    return #{
      $typeName... .create = function($args(,)...){
        var $self = $selfExp;
        var{$vars...}
        $buildBody $self $funcs...;
        $consBody...
        return $self;
      };
      $processStatics ($typeName...) $statics...
    }
  }
  case{$ctx ($self) ($typeName...) ((constructor ($args...){$consBody...}) $funcs...) ($statics...)}=>{
    throwSyntaxError('module', 'missing endvars in constructor', #{ here });
  }
  rule{($self)($typeName...) ($funcs...) ($statics...)}=>{
    $processStatics ($typeName...) $statics...
  }
}

macro (module){
  case{$ctx $typeName(.)...; $rest... endmodule}=>{
    letstx $expanded = localExpand(#{
        $processFunctions  () () ($rest...)
    });
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      $typeName(.)...= {};
      $bodyHelper ($self)($typeName(.)...) $expanded
      }
  }
}

export (module)
