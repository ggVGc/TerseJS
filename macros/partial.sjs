macro $partialUnpackArgs{
  rule{$count ($accumArgs...)($accumParams...) ()}=>{
    ($accumArgs...)
    ($accumParams...)
    $count
  }
  case{ _ $count ($accumArgs...)($accumParams...) (# , $args(,)...)}=>{
    var c = unwrapSyntax(#{$count});
    var ch = String.fromCharCode('a'.charCodeAt(0)+c);
    letstx $var = [makeIdent('_'+ch, #{here})];
    letstx $c = [makeIdent(c+1, #{here})];
    return#{
      $partialUnpackArgs $c ($accumArgs..., $var) ($accumParams... , $var) ($args(,)...)
    }
  }
  rule{$count ($accumArgs...)($accumParams...) ($arg , $args(,)...)}=>{
    $partialUnpackArgs $count ($accumArgs...) ($accumParams... , $arg) ($args(,)...)
  }
  case{ _ $count ($accumArgs...)($accumParams...) (#)}=>{
    var c = unwrapSyntax(#{$count});
    var ch = String.fromCharCode('a'.charCodeAt(0)+c);
    letstx $var = [makeIdent('_'+ch, #{here})];
    letstx $c = [makeIdent(c+1, #{here})];
    return #{
      $partialUnpackArgs $c ($accumArgs..., $var) ($accumParams... , $var) ()
    }
  }
  rule{$count ($accumArgs...)($accumParams...) ($arg)}=>{
    $partialUnpackArgs $count ($accumArgs...) ($accumParams... , $arg) ()
  }
}

macro $makePartialFun{
  case{$ctx ($part...) ($fun) ($args...)(,$params...) $numPlaceholders}=>{
    return #{
      //$part...($fun, [$params...])
      function($args...){
        $fun.apply(this, [$params...].concat(Array.prototype.slice.call(arguments, $numPlaceholders)))
      }
    }
  }
}

macro (~){
  case infix{$fun | $ctx $args(~)...}=>{
    var here = #{ here };
    letstx $expanded = localExpand(#{$partialUnpackArgs 0 () () ($args(,)...)});
    letstx $part = [makeIdent('$_$', #{$ctx})];
    return #{
      $makePartialFun ($part.partial) ($fun) $expanded
    }
  }
}

export (~)
