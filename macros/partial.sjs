macro $partialUnpackArgs{
  rule{$varName:ident ($accumArgs...)($accumParams...) ()}=>{
    ($accumArgs...)
    ($accumParams...)
  }
  case{ _ $varName:ident ($accumArgs...)($accumParams...) (# , $args(,)...)}=>{
    letstx $var = [makeIdent('_'+unwrapSyntax(#{$varName}), #{here})];
    letstx $nextName = [makeIdent(String.fromCharCode(unwrapSyntax(#{$varName}).charCodeAt(0)+1), #{here})];
    return#{
      $partialUnpackArgs $nextName ($accumArgs..., $var) ($accumParams... , $var) ($args(,)...)
    }
  }
  rule{$varName:ident ($accumArgs...)($accumParams...) ($arg , $args(,)...)}=>{
    $partialUnpackArgs $varName ($accumArgs...) ($accumParams... , $arg) ($args(,)...)
  }
  case{ _ $varName:ident ($accumArgs...)($accumParams...) (#)}=>{
    letstx $var = [makeIdent('_'+unwrapSyntax(#{$varName}), #{here})];
    letstx $nextName = [makeIdent(String.fromCharCode(unwrapSyntax(#{$varName}).charCodeAt(0)+1), #{here})];
    return #{
      $partialUnpackArgs $nextName ($accumArgs..., $var) ($accumParams... , $var) ()
    }
  }
  rule{$varName:ident ($accumArgs...)($accumParams...) ($arg)}=>{
    $partialUnpackArgs $varName ($accumArgs...) ($accumParams... , $arg) ()
  }
}

macro $makePartialFun{
  case{$ctx ($part...) ($fun) ($args...)(,$params...) }=>{
    return #{
      //$part...($fun, [$params...])
      function($args...){
        $fun.apply(this, [$params...].concat(Array.prototype.slice.call(arguments)))
      }
    }
  }
}

macro (~){
  case infix{$fun | $ctx $args(~)...}=>{
    var here = #{ here };
    letstx $expanded = localExpand(#{$partialUnpackArgs a () () ($args(,)...)});
    letstx $part = [makeIdent('$_$', #{$ctx})];
    return #{
      $makePartialFun ($part.partial) ($fun) $expanded
    }
  }
}

export (~)
