
// Depends on underscore.js

macro loop{
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
