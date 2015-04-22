
// Depends on underscore.js

macro loop{
  case {$ctx $times {$body...}} => {
    letstx $underscore = [makeIdent('_', #{$ctx})];
    return #{
      $underscore.each($underscore.range(0, $times), function(){
        $body ...
      });
    };
  }
  case {$ctx $start $end {$body...}} => {
    letstx $inclusiveEnd = [makeValue(unwrapSyntax(#{$end})+1, #{here})];
    letstx $underscore = [makeIdent('_', #{$ctx})];
    return #{
      $underscore.each($underscore.range($start, $inclusiveEnd), function(){
        $body ...
      });
    };
  }
  case {$ctx $start $end $loopVar {$body...}} => {
    letstx $inclusiveEnd = [makeValue(unwrapSyntax(#{$end})+1, #{here})];
    letstx $underscore = [makeIdent('_', #{$ctx})];

    return #{
      $underscore.each($underscore.range($start, $inclusiveEnd), function($loopVar){
        $body ...
      });
    };
  }
}

export (loop)
