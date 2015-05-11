macro cascade{
  rule{($decName... ){ $thing...; $rest...} }=>{
    $decName... $thing...; cascade ($decName...){$rest...}
  }
  rule{($decName...){}}=>{
  }
}
export cascade

macro (autovar) {
  rule{($decName...) { global $name:ident=$val:expr; $rest ...} }=>{
    $name = $val; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { var $name:ident=$val:expr; $rest ...} }=>{
    $decName... $name = $val; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { var $name:ident; $rest ...} }=>{
    $decName... $name; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { $name:ident; $rest ...} }=>{
    $decName... $name; autovar ($decName...){$rest ...}
  }
  rule{($decName...) { $name:ident=$val:expr; $rest ...} }=>{
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
  rule infix{ $pre...{$body...};| {$vars...}}=>{
    $pre...{
      autovar{$vars...;}
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



macro $processStatics{
  rule{($typeName...) ($name:ident $args...{$body...}) $rest...}=>{
    $typeName... .$name = function($args(,)...){$body...};
    $processStatics ($typeName...) $rest...
  }
  rule{($typeName...) ($name:ident  = $val...) $rest...}=>{
    $typeName... .$name = $val...;
    $processStatics ($typeName...) $rest...
  }
  rule{($typeName...) }=>{
  }
}

macro $processFunctions{
  rule{ ($funcs...) ($statics...)  (constructor $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs... (constructor($args...){$body...})) ($statics...)  ($rest...)
  }
  rule{ ($funcs...) ($statics...)  (constructor $args:ident...{$body...}; $rest...)}=>{ 
    $processFunctions  ($funcs... (constructor($args...){$body...})) ($statics...)  ($rest...)
  }

  rule{ ($funcs...) ($statics...)  (static $content...; $rest...)}=>{ 
    $processFunctions  ($funcs...) ($statics... ($content...))  ($rest...)
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
  case{$ctx $typeName:ident(.)... {$pre...}; $rest... endmodule}=>{
    letstx $expanded = localExpand(#{
        $processFunctions  () () (constructor $rest...)
    });
    return #{
      $typeName(.)...= {};
      cascade ($typeName... .) {$pre...};
      $bodyHelper ($self)($typeName(.)...) $expanded;
    }
  }
  case{$ctx $typeName:ident(.)...; $rest... endmodule}=>{
    letstx $expanded = localExpand(#{
        $processFunctions  () () (constructor $rest...)
    });
    letstx $self = [makeIdent('self', #{$ctx})];
    return #{
      $typeName(.)...= {};
      $bodyHelper ($self)($typeName(.)...) $expanded;
    }
  }
}

export (module)




